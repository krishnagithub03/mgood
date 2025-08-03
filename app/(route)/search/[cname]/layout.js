import React from "react";
import CategoryList from "../_components/CategoryList";
export async function generateMetadata({ params }) {
  const metadataMap = {
    "General Physician": {
      title: "Medical Tourism Near Me • Treatment in Foreign Countries • Super Specialist Hospital in Delhi",
      description:
        "Get affordable & premium medical tourism options—treatment in foreign countries, stem cell research & therapy, access to super specialist doctor in Delhi, cancer medicines, and high quality healthcare events.",
    },
    "Ortho": {
      title: "Online Doctor Consultation Near Me • Best Online Doctors Delhi • Digital Health Platform",
      description:
        "Connect online with the best online doctors in Delhi and around—get digital healthcare services near me, online medicine delivery, and personalized healthcare support.",
    },
    "Pharmacy": {
      title: "Pharmacy Home Delivery • Best Online Medicine Delivery • Cancer Medicines",
      description:
        "Convenient pharmacy home delivery with best online medicine delivery service, prompt delivery of cancer medicines, elderly care medicine support, and digital healthcare solutions in Delhi.",
    },
    "Associate": {
      title: "Doctors Networking • Healthcare Events • Camps Near Me",
      description:
        "Join professional doctors networking, attend healthcare events and camps near me, corporate doctor speaking events, and cutting edge stem cell research & therapy workshops.",
    },
    "Physiotherapy": {
      title: "Elderly Care Services in Delhi • Doctor to Corporate Events • Super Specialist Hospital Services",
      description:
        "Dedicated elderly care services in Delhi, super specialist hospital in Delhi, doctors to corporate events, corporate healthcare programs, and stem cell therapy support for serious conditions.",
    },
  };

  const cname = decodeURIComponent(params.cname);
  const meta = metadataMap[cname];

  if (!meta) {
    return {
      title: "MGood | Healthcare Platform",
      description: "Discover trusted medical services and doctors.",
    };
  }

  return meta;
}


const layout = ({ children }) => {
  return (
    <div className="grid grid-cols-4">
      <div className="hidden md:block md:col-span-1">
        {/* search by location */}
        <CategoryList />
      </div>
      <div className="col-span-4 md:col-span-3">{children}</div>
    </div>
  );
};

export default layout;
