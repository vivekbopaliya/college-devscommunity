import React from "react";

const page = () => {
  return (
    <div className="sm:w-screen sm:h-screen w-full h-fit flex sm:pb-5 pb-5 text-black dark:text-gray-300 flex-col justify-center items-center sm:container">
      <main className="max-w-6xl px-4 sm:px-0 flex flex-col  sm:container font-light">
        <h1 className="my-3 text-4xl font-bold dark:text-white ">
          Privacy Policy
        </h1>

        <h3 className="mb-1 mt-6 font-semibold dark:text-white">
          Information Collection and Use:
        </h3>

        <p>
          The GDSC Event Management app collects personal information such as
          name, email, and profile details to facilitate event management and
          RSVP functionality. User data is used for event notifications, RSVP
          tracking, and club member interaction within the app.
        </p>

        <h3 className="mb-1 mt-6 font-semibold dark:text-white">
          Event Posting and RSVP:
        </h3>

        <p>
          Admins can post events via the app, and users have the option to RSVP
          for these events using the GDSC Event Platform integrated into the
          app.
        </p>

        <h3 className="mb-1 mt-6 font-semibold dark:text-white">
          Profile Viewing:
        </h3>

        <p>
          Users can view other club members' profiles within the app to foster
          community interaction.
        </p>

        <h3 className="mb-1 mt-6 font-semibold dark:text-white">
          Notifications:
        </h3>

        <p>
          Users receive notifications for new event postings and announcements
          within the GDSC club.
        </p>
        <h3 className="mb-1 mt-6 font-semibold dark:text-white">
          Data Security:
        </h3>

        <p>
          We take measures to secure user data and prevent unauthorized access
          or disclosure.
        </p>

        <h3 className="mb-1 mt-6 font-semibold dark:text-white">
          Third-party Access:
        </h3>

        <p>
          The app may use third-party services for event management and
          notifications. These services may have their own privacy policies.
        </p>

        <h3 className="mb-1 mt-6 font-semibold dark:text-white">
          Data Sharing:
        </h3>

        <p>
          Personal information collected within the app is not shared with
          external parties without user consent, except as required by law or
          for app functionality.
        </p>
        <h3 className="my-3 font-semibold dark:text-white">
          Updates and Contact:
        </h3>
        <p>
          We may update this Privacy Policy. Users will be notified of any
          changes. For inquiries or concerns about privacy, contact{" "}
          <span className="font-semibold text-blue-500">
            gdsc.atmiya@gmail.com
          </span>
        </p>
      </main>
    </div>
  );
};

export default page;
