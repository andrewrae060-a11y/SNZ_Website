import {
  lazy,
  Suspense,
  useEffect,
  useState,
} from "react";
import Homepage from "./pages/Homepage";
import EnquiryModal from "./components/EnquiryModal";

const AboutUs = lazy(() => import("./pages/AboutUs"));
const Careers = lazy(() => import("./pages/Careers"));
const CareersAdmin = lazy(() => import("./admin/CareersAdmin"));
const SocialMedia = lazy(() => import("./pages/SocialMedia"));
const AdminCMS = lazy(() => import("./pages/admin/AdminCMS"));
const Research = lazy(() => import("./pages/Research"));
const ResearchAdmin = lazy(() => import("./pages/ResearchAdmin"));

const SustainabilityNetZero = lazy(() => import("./pages/SustainabilityNetZero"));
const OTSecurityResilience = lazy(() =>  import("./pages/OTSecurityResilience"));
const SmartRegulations = lazy(() => import("./pages/SmartRegulations"));
const SmartEnergyManagement = lazy(() =>  import("./pages/SmartEnergyManagement"));

const SmartApplications = lazy(() => import("./pages/SmartApplications"));
const ImpactDashboard = lazy(() => import("./pages/ImpactDashboard"));
const SmartDecarb360 = lazy(() => import("./pages/SmartDecarb360"));
const LabTestingCompliance = lazy(() => import("./pages/LabTestingCompliance"));
const SpecialistConsultancy = lazy(() => import("./pages/SpecialistConsultancy"));
const SmartInfrastructureAssurance = lazy(() => import("./pages/SmartInfrastructureAssurance"));
const EnergyOptimisation = lazy(() => import("./pages/EnergyOptimisation"));

const BuiltEnvironment = lazy(() => import("./pages/BuiltEnvironment"));
const PublicSectorLocalAuthorities = lazy(() => import("./pages/PublicSectorLocalAuthorities"));
const ManufacturersConnectedProducts = lazy(() => import("./pages/ManufacturersConnectedProducts"));
const EnergyUtilitiesCriticalInfrastructure = lazy(() => import("./pages/EnergyUtilitiesCriticalInfrastructure"));
const DataCentres = lazy(() => import("./pages/DataCentres"));

const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const ModernSlavery = lazy(() => import("./pages/ModernSlavery"));
const CarbonReductionStatement = lazy(() => import("./pages/CarbonReductionStatement"));
const AccessibilityStatement = lazy(() => import("./pages/AccessibilityStatement"));

export default function App() {
  const getInitialPage = () => {
  const path = window.location.pathname
    .toLowerCase()
    .replace(/\/+$/, "") || "/";

  if (path === "/admin/careers") {
    return "CareersAdmin";
  }

  if (path === "/careers") {
    return "Careers";
  }

  if (path === "/research-admin") {
    return "ResearchAdmin";
  }

  if (path === "/research") {
    return "Research";
  }

  if (path === "/admin/content") {
  return "AdminCMS";
  }

  return "Homepage";
};

  const [activePage, setActivePage] = useState(getInitialPage);
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  const openEnquiryForm = () => setEnquiryOpen(true);
  const closeEnquiryForm = () => setEnquiryOpen(false);

  const goToPage = (page) => {
    setActivePage(page);

    const paths = {
      Homepage: "/",
      Careers: "/careers",
      CareersAdmin: "/admin/careers",
      AdminCMS: "/admin/content",
      Research: "/research",
      ResearchAdmin: "/research-admin",
      SocialMedia: "/social-media",
    };

    const nextPath = paths[page] || "/";

      if (window.location.pathname !== nextPath) {
        window.history.pushState({}, "", nextPath);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname
        .toLowerCase()
        .replace(/\/+$/, "") || "/";

      if (path === "/admin/careers") {
        setActivePage("CareersAdmin");
        return;
      }

      if (path === "/careers") {
        setActivePage("Careers");
        return;
      }

      if (path === "/admin/content") {
        setActivePage("AdminCMS");
        return;
      }

      if (path === "/social-media") {
        setActivePage("SocialMedia");
        return;
      }

      if (path === "/research-admin") {
        setActivePage("ResearchAdmin");
        return;
      }

      if (path === "/research") {
        setActivePage("Research");
        return;
      }

      setActivePage("Homepage");
    };

    window.addEventListener(
      "popstate",
      handlePopState
    );

    return () => {
      window.removeEventListener(
        "popstate",
        handlePopState
      );
    };
  }, []);   

  return (
    <>
      {activePage === "Homepage" && (
        <Homepage goToPage={goToPage} openEnquiryForm={openEnquiryForm} />
      )}

      {activePage === "SocialMedia" && (
        <Suspense
          fallback={<div style={{ padding: 40 }}>Loading Social Media page...</div>}
        >
          <SocialMedia goToPage={goToPage} openEnquiryForm={openEnquiryForm} />
        </Suspense>
      )}

      {activePage === "AboutUs" && (
        <Suspense fallback={<div style={{ padding: 40 }}>Loading About Us...</div>}>
          <AboutUs goToPage={goToPage} openEnquiryForm={openEnquiryForm} />
        </Suspense>
      )}

      {activePage === "Careers" && (
      <Suspense fallback={<div style={{ padding: 40 }}>Loading Careers...</div>}>
        <Careers goToPage={goToPage} openEnquiryForm={openEnquiryForm} />
      </Suspense>
      )}

      {activePage === "CareersAdmin" && (
      <Suspense
        fallback={
          <div style={{ padding: 40 }}>
            Loading Careers Administration...
          </div>
        }
      >
        <CareersAdmin />
      </Suspense>
    )}

    {activePage === "AdminCMS" && (
      <Suspense
        fallback={
          <div style={{ padding: 40 }}>
            Loading Content Administration...
          </div>
        }
      >
        <AdminCMS goToPage={goToPage} />
      </Suspense>
    )}

      {activePage === "Research" && (
        <Suspense fallback={<div style={{ padding: 40 }}>Loading Research page...</div>}>
          <Research goToPage={goToPage} openEnquiryForm={openEnquiryForm} />
        </Suspense>
      )}

      {activePage === "ResearchAdmin" && (
        <Suspense
          fallback={
            <div style={{ padding: 40 }}>
              Loading Research Administration...
            </div>
          }
        >
          <ResearchAdmin />
        </Suspense>
      )}

      {activePage === "SmartRegulations" && (
        <Suspense
          fallback={
            <div style={{ padding: 40 }}>Loading Smart Regulations page...</div>
          }
        >
          <SmartRegulations
            goToPage={goToPage}
            openEnquiryForm={openEnquiryForm}
          />
        </Suspense>
      )}    

      {activePage === "SustainabilityNetZero" && (
        <Suspense
          fallback={
            <div style={{ padding: 40 }}>
              Loading Sustainability & Net Zero...
            </div>
          }
        >
          <SustainabilityNetZero
            goToPage={goToPage}
            openEnquiryForm={openEnquiryForm}
          />
        </Suspense>
      )}

      {activePage === "ImpactDashboard" && (
        <Suspense
          fallback={<div style={{ padding: 40 }}>Loading Impact Dashboard...</div>}
        >
          <ImpactDashboard
            goToPage={goToPage}
            openEnquiryForm={openEnquiryForm}
          />
        </Suspense>
      )}

      {activePage === "OTSecurityResilience" && (
        <Suspense
          fallback={
            <div style={{ padding: 40 }}>
              Loading OT Security & Resilience...
            </div>
          }
        >
          <OTSecurityResilience
            goToPage={goToPage}
            openEnquiryForm={openEnquiryForm}
          />
        </Suspense>
      )}

      {activePage === "SmartApplications" && (
        <Suspense
          fallback={
            <div className="p-10">
              Loading Smart Applications...
            </div>
          }
        >
          <SmartApplications
            goToPage={goToPage}
            openEnquiryForm={openEnquiryForm}
          />
        </Suspense>
      )}
            
      {activePage === "SmartDecarb360" && (
        <Suspense
          fallback={<div style={{ padding: 40 }}>Loading SmartDecarb360...</div>}
        >
          <SmartDecarb360
            goToPage={goToPage}
            openEnquiryForm={openEnquiryForm}
          />
        </Suspense>
      )}

      {activePage === "LabTestingCompliance" && (
        <LabTestingCompliance
          goToPage={goToPage}
          openEnquiryForm={openEnquiryForm}
        />
      )}

      {activePage === "SpecialistConsultancy" && (
        <SpecialistConsultancy
          goToPage={goToPage}
          openEnquiryForm={openEnquiryForm}
        />
      )}

      {activePage === "SmartInfrastructureAssurance" && (
        <Suspense
          fallback={
            <div style={{ padding: 40 }}>
              Loading Smart Infrastructure Assurance...
            </div>
          }
        >
          <SmartInfrastructureAssurance
            goToPage={goToPage}
            openEnquiryForm={openEnquiryForm}
          />
        </Suspense>
      )}

      {activePage === "EnergyOptimisation" && (
        <Suspense fallback={<div style={{ padding: 40 }}>Loading Energy Optimisation...</div>}>
          <EnergyOptimisation
            goToPage={goToPage}
            openEnquiryForm={openEnquiryForm}
          />
        </Suspense>
      )}

            {activePage === "SmartEnergyManagement" && (
        <Suspense
          fallback={
            <div style={{ padding: 40 }}>
              Loading Smart Energy Management...
            </div>
          }
        >
          <SmartEnergyManagement
            goToPage={goToPage}
            openEnquiryForm={openEnquiryForm}
          />
        </Suspense>
      )}

      {activePage === "BuiltEnvironment" && (
        <Suspense
          fallback={
            <div style={{ padding: 40 }}>
              Loading Built Environment...
            </div>
          }
        >
          <BuiltEnvironment
            goToPage={goToPage}
            openEnquiryForm={openEnquiryForm}
          />
        </Suspense>
      )}

      {activePage === "PublicSectorLocalAuthorities" && (
        <Suspense
          fallback={
            <div style={{ padding: 40 }}>
              Loading Public Sector & Local Authorities...
            </div>
          }
        >
          <PublicSectorLocalAuthorities
            goToPage={goToPage}
            openEnquiryForm={openEnquiryForm}
          />
        </Suspense>
      )}

      {activePage === "ManufacturersConnectedProducts" && (
        <Suspense
          fallback={
            <div style={{ padding: 40 }}>
              Loading Manufacturers & Connected Products...
            </div>
          }
        >
          <ManufacturersConnectedProducts
            goToPage={goToPage}
            openEnquiryForm={openEnquiryForm}
          />
        </Suspense>
      )}

      {activePage === "EnergyUtilitiesCriticalInfrastructure" && (
        <Suspense
          fallback={
            <div style={{ padding: 40 }}>
              Loading Energy, Utilities & Critical Infrastructure...
            </div>
          }
        >
          <EnergyUtilitiesCriticalInfrastructure
            goToPage={goToPage}
            openEnquiryForm={openEnquiryForm}
          />
        </Suspense>
      )}

      {activePage === "DataCentres" && (
        <Suspense fallback={<div style={{ padding: 40 }}>Loading Data Centres...</div>}>
          <DataCentres goToPage={goToPage} openEnquiryForm={openEnquiryForm} />
        </Suspense>
      )}

        {activePage === "PrivacyPolicy" && (
        <Suspense fallback={<div style={{ padding: 40 }}>Loading Privacy Policy...</div>}>
          <PrivacyPolicy
            goToPage={goToPage}
            openEnquiryForm={openEnquiryForm}
          />
        </Suspense>
      )}

      {activePage === "ModernSlavery" && (
        <Suspense
          fallback={
            <div style={{ padding: 40 }}>
              Loading Modern Slavery Statement...
            </div>
          }
        >
          <ModernSlavery
            goToPage={goToPage}
            openEnquiryForm={openEnquiryForm}
          />
        </Suspense>
      )}

      {activePage === "CarbonReductionStatement" && (
        <Suspense
          fallback={
            <div style={{ padding: 40 }}>
              Loading Carbon Reduction Statement...
            </div>
          }
        >
          <CarbonReductionStatement
            goToPage={goToPage}
            openEnquiryForm={openEnquiryForm}
          />
        </Suspense>
      )}

      {activePage === "AccessibilityStatement" && (
        <Suspense
          fallback={
            <div style={{ padding: 40 }}>
              Loading Accessibility Statement...
            </div>
          }
        >
          <AccessibilityStatement
            goToPage={goToPage}
            openEnquiryForm={openEnquiryForm}
          />
        </Suspense>
      )}

      <EnquiryModal open={enquiryOpen} onClose={closeEnquiryForm} />
    </>
  );
}