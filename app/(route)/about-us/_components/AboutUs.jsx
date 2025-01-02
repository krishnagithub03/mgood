import React from "react";

const AboutUs = () => {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 ">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
          <div>
            <div className="max-w-lg md:max-w-none">
              <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
                About <span className="text-primary">MGood</span>
              </h2>

              <p className="mt-4 text-gray-700 italic">
                "At MGood, we've made a promise to make doctors accessible to
                everyone by 2029. We're working tirelessly to turn this vision
                into a reality. Our commitment goes beyond teleconsultation.
                We're dedicated to empowering our Medical Good Partners (MGPs)
                to achieve their dreams of being part of a multispecialty setup.
                Remember, MGood is more than just a platform – we're a friend in
                need. Join hands with us, and together, let's create a world
                that's not just a place to live, but a good – an MGood –
                place to thrive."
              </p>
            </div>
          </div>

          <div>
            <img src="/about-img.jpg" className="rounded" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
