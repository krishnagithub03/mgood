import React from "react";

const AboutUs = () => {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-3 px-8 md:h-screen h-auto md:my-0 my-6">
        {/* image */}
        <div className="md:col-span-1 p-2 md:rounded-none rounded-md flex flex-col justify-center align-middle">
          <img src="/about-img.jpg" alt="" />
        </div>
        {/* text area */}
        <div className="flex flex-col gap-8 p-2 md:col-span-2">
          <div className="my-auto">
            <h2 className="md:text-3xl text-xl font-display font-bold md:px-16">
              About <span className="text-primary">MGood</span>
            </h2>
            <p className="italic font-body h-full md:p-16 md:text-xl text-sm">
              "At MGood, we've made a promise to make doctors accessible to
              everyone by 2029. We're working tirelessly to turn this vision
              into a reality. Our commitment goes beyond teleconsultation. We're
              dedicated to empowering our Medical Good Partners (MGPs) to
              achieve their dreams of being part of a multispecialty setup.
              Remember, MGood is more than just a platform – we're a friend in
              need. Join hands with us, and together, let's create a world
              that's not just a place to live, but a good – an MGood –
              place to thrive."
            </p>
          </div>
        </div>
      </div>
      {/* MD's Desk */}
      <div className="grid grid-cols-1 md:grid-cols-3 p-8 bg-slate-200 h-auto">
        <div className="p-2 md:col-span-1 m-auto">
          <img
            src="/mgood-rajendra.jpg"
            alt=""
            className="h-72 w-72 rounded-full overflow-hidden"
          />
        </div>
        <div className="md:col-span-2 md:p-16 my-auto">
          <h2 className="md:text-3xl text-2xl font-display font-bold p-2">
            MD's <span className="text-primary">Desk</span>
          </h2>
          <p className="font-body p-2">
            I am thrilled to introduce MGood, a revolutionary platform poised to
            transform the healthcare industry. Our mission is bold and
            ambitious:{" "}
            <span className="font-bold text-primary italic">
              "Doctor for All by 2029."
            </span>{" "}
            We envision a world where geographical boundaries and socio-economic
            disparities no longer hinder access to quality medical care. At
            MGood, we are committed to making this vision a reality. Our team is
            working tirelessly to ensure that everyone, regardless of their
            location or background, has access to reliable and affordable
            healthcare services. We believe that healthcare is a fundamental
            human right, and we are dedicated to bridging the gap between those
            who need medical attention and the healthcare professionals who can
            provide it. Join us on this extraordinary journey as we strive to
            create a healthier, more compassionate world. Together, let's make
            "Doctor for All" a reality by 2029. Stay tuned for updates on our
            progress, and let's transform the healthcare landscape together!
          </p>
        </div>
      </div>
      {/* Our Team */}
      <div className="bg-white dark:bg-gray-900 h-auto" id="our-team">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
          <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Our Team
            </h2>
            <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
              Meet out experts who are driving the MGood platform and brand.
            </p>
          </div>
          <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
            <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <img
                  className="w-32 h-32 rounded-lg sm:rounded-none sm:rounded-l-lg object-fit md:ml-0 ml-5"
                  src="/mgood-gaurav.jpg"
                  alt="Bonnie Avatar"
                />
              </a>
              <div className="p-5">
                <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <a href="#">Dr. Gaurav Aggrawal</a>
                </h3>
                <span className="text-gray-500 dark:text-gray-400">
                  Director & Chief Networking Officer
                </span>
              </div>
            </div>
            <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <img
                  className="w-32 h-32 rounded-lg sm:rounded-none sm:rounded-l-lg object-fit md:ml-0 ml-5"
                  src="/mgood-puneet.jpg"
                  alt="Jese Avatar"
                />
              </a>
              <div className="p-5">
                <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <a href="#">Mr. Puneet Singhal</a>
                </h3>
                <span className="text-gray-500 dark:text-gray-400">
                  Head - Marketing , legal and Sponsorship
                </span>
              </div>
            </div>
            <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <img
                  className="w-32 h-32 rounded-lg sm:rounded-none sm:rounded-l-lg object-fit md:ml-0 ml-5"
                  src="/mgood-garima.jpg"
                  alt="Michael Avatar"
                />
              </a>
              <div className="p-5">
                <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <a href="#">Mrs. Garima Gangal</a>
                </h3>
                <span className="text-gray-500 dark:text-gray-400">
                  Head - Admin & Process
                </span>
              </div>
            </div>
            <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <img
                  className="w-32 h-32 rounded-lg sm:rounded-none sm:rounded-l-lg overflow-hidden md:ml-0 ml-5"
                  src="/mgood-krishna.jpg"
                  alt="Sofia Avatar"
                />
              </a>
              <div className="p-5">
                <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <a href="#">Mr. Krishna Agrawal</a>
                </h3>
                <span className="text-gray-500 dark:text-gray-400">
                  IT Infrastructure Expert
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
