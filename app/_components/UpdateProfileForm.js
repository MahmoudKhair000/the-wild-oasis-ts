'use client';

import { updateGuest } from '@/app/_lib/actions';
import Image from 'next/image';
// import { useFormStatus } from 'react-dom';
import SubmitButton from './SubmitButton';

function UpdateProfileForm({ guest, children }) {
  const { fullName, email, nationalID, countryFlag } = guest;

  return (
    <form
      action={updateGuest}
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          disabled
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          value={fullName}
          defaultValue={fullName}
          name="fullName"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          disabled
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          value={email}
          defaultValue={email}
          name="email"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          <div className="h-6 w-9 rounded-sm relative ">
            {countryFlag && (
              <Image
                src={countryFlag}
                className="object-cover h-full w-full"
                fill
                alt="Country flag"
              />
            )}
          </div>
        </div>
        {/* The select element */}
        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          name="nationalID"
          defaultValue={nationalID}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <SubmitButton
          label={'Update Profile'}
          pendingLabel={'Updating...'}
        />
      </div>
    </form>
  );
}

export default UpdateProfileForm;
