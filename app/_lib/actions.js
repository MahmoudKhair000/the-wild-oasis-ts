'use server';
// 'use server' directive is required to use server actions
// , not for server components.
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth, signIn, signOut } from './auth';
import { getBookings, getSettings } from './data-service';
import supabase from './supabase';

export async function updateGuest(formData) {
  // 1. Check if there is an authenticated user session
  const session = await auth();
  if (!session) throw new Error('You must be logged in');
  console.log(session);

  // console.log(formData);
  const nationalID = formData.get('nationalID');
  const [nationality, countryFlag] = formData.get('nationality').split('%');

  // 2. Check if the ID is valid
  // this is not the ideal way to validate national IDs
  // , there are more professional ways to do it
  if (!/^[a-zA-Z0-9]{6,14}$/.test(nationalID))
    throw new Error('Please provide a valid national ID');

  // 3. if there are no obstacles
  // , create the update object
  const updateData = { nationality, countryFlag, nationalID };
  console.log(updateData);

  // , and update the guest in supabase tables
  const { error } = await supabase
    .from('guests')
    .update(updateData)
    .eq('id', String(session.user.guestId));
  // .eq('email', String(session.user.email));
  if (error) throw new Error('Guest could not be updated');

  // 4. Revalidate Cache manually for the UI
  revalidatePath('/account/profile');
}

export async function createBooking(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error('You must be logged in');

  // and we caould use a validation library here, like 'zod'
  const newBooking = {
    guestId: session.user.guestId,
    ...bookingData,
    numGuests: Number(formData.get('numGuests')),
    observations: formData.get('observations').slice(0, 1000),
    status: 'unconfirmed',
    isPaid: false,
  };
  // console.log(newBooking);

  const { error } = await supabase.from('bookings').insert([newBooking]);
  // .select()
  // .single();
  if (error) throw new Error('Booking could not be created!');
  // console.log(resData);

  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect('/cabins/thankyou');
}

export async function deleteBooking(bookingId) {
  // await new Promise((res) => setTimeout(res, 2000));
  // // optimistic state will appear untill the async code runs
  // throw new Error();
  // // the original state will be back in case of error

  const session = await auth();
  if (!session) throw new Error('You must be logged in');

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingsIds.includes(bookingId))
    throw new Error('You are not authorized to delete this booking !');

  const { error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', bookingId);
  if (error) throw new Error('Could not delete reservation');

  revalidatePath('/account/reservations');
}

export async function updateBooking(formData) {
  const bookingId = formData.get('reservationId');
  // 1. Authentication layer
  const session = await auth();
  if (!session) throw new Error('You must be logged in');

  // 2. Authorization layer
  // getting booking Ids for the signed in user.
  const bookings = await getBookings(session.user.guestId);
  const bookingIds = bookings.map((b) => `${b.id}`);
  // checking if this booking belongs to the user
  if (!bookingIds.includes(bookingId))
    throw new Error('You are not authorized to edit this booking !');

  // 3. editing reseration
  // making rawFormData object
  const rawFormData = Object.fromEntries(formData.entries());
  // console.log(rawFormData);
  const updateData = {
    numGuests: rawFormData.numGuests,
    observations: rawFormData.observations.slice(0, 1000),
  };
  // console.log(updateData);
  const { error } = await supabase
    .from('bookings')
    .update(updateData)
    .eq('id', rawFormData.reservationId);
  if (error) throw new Error('Could not update reservation!!');

  // 4. use useFormStatus() to handle the UI state
  // in a client componenet button in ↓
  // @/app/account/reservations/edit/[reservationId]/page.js

  // 5. revalidate cache using revalidatePath()
  revalidatePath('/account/reservations');
  revalidatePath(`/account/reservations/edit/${bookingId}`);

  // 6. redirect to all reservations
  redirect('/account/reservations');
}

export async function signInAction(callbackUrl) {
  await signIn('google', { redirectTo: callbackUrl });

  revalidatePath(callbackUrl);
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}
