import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Homepage from "./pages/Homepage";
import EnquiryModal from "./components/EnquiryModal";

const AboutUs = lazy(() =>
  import("./pages/AboutUs")
);

const Careers = lazy(() =>
  import("./pages/Careers")
);

const CareersAdmin = lazy(() =>
  import("./admin/CareersAdmin")
);

const SocialMedia = lazy(() =>
  import("./pages/SocialMedia")
);

const AdminCMS = lazy(() =>
  import("./pages/admin/AdminCMS")
);

const Research = lazy(() =>
  import("./pages/Research")
);

const ResearchAdmin = lazy(() =>
  import("./pages/ResearchAdmin")
);

const SustainabilityNetZero = lazy(() =>
  import("./pages/SustainabilityNetZero")
);

const OTSecurityResilience = lazy(() =>
  import("./pages/OTSecurityResilience")
);

const SmartRegulations = lazy(() =>
  import("./pages/SmartRegulations")
);

const SmartEnergyManagement = lazy(() =>
  import("./pages/SmartEnergyManagement")
);

const SmartApplications = lazy(() =>
  import("./pages/SmartApplications")
);

const ImpactDashboard = lazy(() =>
  import("./pages/ImpactDashboard")
);

const SmartDecarb360 = lazy(() =>
  import("./pages/SmartDecarb360")
);

const LabTestingCompliance = lazy(() =>
  import("./pages/LabTestingCompliance")
);

const SpecialistConsultancy = lazy(() =>
  import("./pages/SpecialistConsultancy")
);

const SmartInfrastructureAssurance = lazy(() =>
  import("./pages/SmartInfrastructureAssurance")
);

const EnergyOptimisation = lazy(() =>
  import("./pages/EnergyOptimisation")
);

const BuiltEnvironment = lazy(() =>
  import("./pages/BuiltEnvironment")
);

const PublicSectorLocalAuthorities = lazy(() =>
  import("./pages/PublicSectorLocalAuthorities")
);

const ManufacturersConnectedProducts = lazy(() =>
  import("./pages/ManufacturersConnectedProducts")
);

const EnergyUtilitiesCriticalInfrastructure = lazy(() =>
  import("./pages/EnergyUtilitiesCriticalInfrastructure")
);

const DataCentres = lazy(() =>
  import("./pages/DataCentres")
);

const PrivacyPolicy = lazy(() =>
  import("./pages/PrivacyPolicy")
);

const ModernSlavery = lazy(() =>
  import("./pages/ModernSlavery")
);

const CarbonReductionStatement = lazy(() =>
  import("./pages/CarbonReductionStatement")
);

const AccessibilityStatement = lazy(() =>
  import("./pages/AccessibilityStatement")
);

/**
 * Maps the existing goToPage("PageName") calls
 * to proper browser URLs.
 */
const PAGE_PATHS = {
  Homepage: "/",
  AboutUs: "/about",

  Careers: "/careers",
  CareersAdmin: "/admin/careers",

  Research: "/research",
  ResearchAdmin: "/admin/research",

  SocialMedia: "/content-hub",
  AdminCMS: "/admin/content",

  SustainabilityNetZero:
    "/solutions/sustainability-net-zero",

  OTSecurityResilience:
    "/solutions/ot-security-resilience",

  SmartRegulations:
    "/solutions/smart-regulations",

  SmartEnergyManagement:
    "/solutions/smart-energy-management",

  SmartApplications:
    "/solutions/smart-applications",

  ImpactDashboard:
    "/solutions/impact-dashboard",

  SmartDecarb360:
    "/solutions/smart-decarb360",

  LabTestingCompliance:
    "/solutions/lab-testing-compliance",

  SpecialistConsultancy:
    "/solutions/specialist-consultancy",

  SmartInfrastructureAssurance:
    "/solutions/smart-infrastructure-assurance",

  EnergyOptimisation:
    "/solutions/energy-optimisation",

  BuiltEnvironment:
    "/sectors/built-environment",

  PublicSectorLocalAuthorities:
    "/sectors/public-sector-local-authorities",

  ManufacturersConnectedProducts:
    "/sectors/manufacturers-connected-products",

  EnergyUtilitiesCriticalInfrastructure:
    "/sectors/energy-utilities-critical-infrastructure",

  DataCentres:
    "/sectors/data-centres",

  PrivacyPolicy:
    "/privacy-policy",

  ModernSlavery:
    "/modern-slavery-statement",

  CarbonReductionStatement:
    "/carbon-reduction-statement",

  AccessibilityStatement:
    "/accessibility-statement",
};

function PageLoading({
  message = "Loading page...",
}) {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "grid",
        placeItems: "center",
        padding: 40,
      }}
    >
      <div
        style={{
          fontWeight: 700,
          color: "#334155",
        }}
      >
        {message}
      </div>
    </div>
  );
}

function LazyPage({
  children,
  message,
}) {
  return (
    <Suspense
      fallback={
        <PageLoading message={message} />
      }
    >
      {children}
    </Suspense>
  );
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [enquiryOpen, setEnquiryOpen] =
    useState(false);

  const openEnquiryForm =
    useCallback(() => {
      setEnquiryOpen(true);
    }, []);

  const closeEnquiryForm =
    useCallback(() => {
      setEnquiryOpen(false);
    }, []);

  /**
   * Keeps existing components working without
   * having to replace every goToPage call at once.
   */
  const goToPage = useCallback(
    (page) => {
      const nextPath =
        PAGE_PATHS[page] || "/";

      navigate(nextPath);
    },
    [navigate]
  );

  /**
   * Scroll to the top whenever the route changes.
   */
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [location.pathname]);

  const sharedPageProps = {
    goToPage,
    openEnquiryForm,
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Homepage
              {...sharedPageProps}
            />
          }
        />

        <Route
          path="/about"
          element={
            <LazyPage message="Loading About Us...">
              <AboutUs
                {...sharedPageProps}
              />
            </LazyPage>
          }
        />

        <Route
          path="/careers"
          element={
            <LazyPage message="Loading Careers...">
              <Careers
                {...sharedPageProps}
              />
            </LazyPage>
          }
        />

        <Route
          path="/research"
          element={
            <LazyPage message="Loading Research...">
              <Research
                {...sharedPageProps}
              />
            </LazyPage>
          }
        />

        <Route
          path="/content-hub"
          element={
            <LazyPage message="Loading Content Hub...">
              <SocialMedia
                {...sharedPageProps}
              />
            </LazyPage>
          }
        />

        <Route
          path="/solutions/sustainability-net-zero"
          element={
            <LazyPage message="Loading Sustainability and Net Zero...">
              <SustainabilityNetZero
                {...sharedPageProps}
              />
            </LazyPage>
          }
        />

        <Route
          path="/solutions/ot-security-resilience"
          element={
            <LazyPage message="Loading OT Security and Resilience...">
              <OTSecurityResilience
                {...sharedPageProps}
              />
            </LazyPage>
          }
        />

        <Route
          path="/solutions/smart-regulations"
          element={
            <LazyPage message="Loading Smart Regulations...">
              <SmartRegulations
                {...sharedPageProps}
              />
            </LazyPage>
          }
        />

        <Route
          path="/solutions/smart-energy-management"
          element={
            <LazyPage message="Loading Smart Energy Management...">
              <SmartEnergyManagement
                {...sharedPageProps}
              />
            </LazyPage>
          }
        />

        <Route
          path="/solutions/smart-applications"
          element={
            <LazyPage message="Loading Smart Applications...">
              <SmartApplications
                {...sharedPageProps}
              />
            </LazyPage>
          }
        />

        <Route
          path="/solutions/impact-dashboard"
          element={
            <LazyPage message="Loading Impact Dashboard...">
              <ImpactDashboard
                {...sharedPageProps}
              />
            </LazyPage>
          }
        />

        <Route
          path="/solutions/smart-decarb360"
          element={
            <LazyPage message="Loading SmartDecarb360...">
              <SmartDecarb360
                {...sharedPageProps}
              />
            </LazyPage>
          }
        />

        <Route
          path="/solutions/lab-testing-compliance"
          element={
            <LazyPage message="Loading Lab Testing and Compliance...">
              <LabTestingCompliance
                {...sharedPageProps}
              />
            </LazyPage>
          }
        />

        <Route
          path="/solutions/specialist-consultancy"
          element={
            <LazyPage message="Loading Specialist Consultancy...">
              <SpecialistConsultancy
                {...sharedPageProps}
              />
            </LazyPage>
          }
        />

        <Route
          path="/solutions/smart-infrastructure-assurance"
          element={
            <LazyPage message="Loading Smart Infrastructure Assurance...">
              <SmartInfrastructureAssurance
                {...sharedPageProps}
              />
            </LazyPage>
          }
        />

        <Route
          path="/solutions/energy-optimisation"
          element={
            <LazyPage message="Loading Energy Optimisation...">
              <EnergyOptimisation
                {...sharedPageProps}
              />
            </LazyPage>
          }
        />

        <Route
          path="/sectors/built-environment"
          element={
            <LazyPage message="Loading Built Environment...">
              <BuiltEnvironment
                {...sharedPageProps}
              />
            </LazyPage>
          }
        />

        <Route
          path="/sectors/public-sector-local-authorities"
          element={
            <LazyPage message="Loading Public Sector and Local Authorities...">
              <PublicSectorLocalAuthorities
                {...sharedPageProps}
              />
            </LazyPage>
          }
        />

        <Route
          path="/sectors/manufacturers-connected-products"
          element={
            <LazyPage message="Loading Manufacturers and Connected Products...">
              <ManufacturersConnectedProducts
                {...sharedPageProps}
              />
            </LazyPage>
          }
        />

        <Route
          path="/sectors/energy-utilities-critical-infrastructure"
          element={
            <LazyPage message="Loading Energy, Utilities and Critical Infrastructure...">
              <EnergyUtilitiesCriticalInfrastructure
                {...sharedPageProps}
              />
            </LazyPage>
          }
        />

        <Route
          path="/sectors/data-centres"
          element={
            <LazyPage message="Loading Data Centres...">
              <DataCentres
                {...sharedPageProps}
              />
            </LazyPage>
          }
        />

        <Route
          path="/privacy-policy"
          element={
            <LazyPage message="Loading Privacy Policy...">
              <PrivacyPolicy
                {...sharedPageProps}
              />
            </LazyPage>
          }
        />

        <Route
          path="/modern-slavery-statement"
          element={
            <LazyPage message="Loading Modern Slavery Statement...">
              <ModernSlavery
                {...sharedPageProps}
              />
            </LazyPage>
          }
        />

        <Route
          path="/carbon-reduction-statement"
          element={
            <LazyPage message="Loading Carbon Reduction Statement...">
              <CarbonReductionStatement
                {...sharedPageProps}
              />
            </LazyPage>
          }
        />

        <Route
          path="/accessibility-statement"
          element={
            <LazyPage message="Loading Accessibility Statement...">
              <AccessibilityStatement
                {...sharedPageProps}
              />
            </LazyPage>
          }
        />

        <Route
          path="/admin/careers"
          element={
            <LazyPage message="Loading Careers Administration...">
              <CareersAdmin />
            </LazyPage>
          }
        />

        <Route
          path="/admin/content"
          element={
            <LazyPage message="Loading Content Administration...">
              <AdminCMS
                goToPage={goToPage}
              />
            </LazyPage>
          }
        />

        <Route
          path="/admin/research"
          element={
            <LazyPage message="Loading Research Administration...">
              <ResearchAdmin />
            </LazyPage>
          }
        />

        {/*
          Redirect old links so existing bookmarks
          and previously shared links still work.
        */}
        <Route
          path="/social-media"
          element={
            <Navigate
              to="/content-hub"
              replace
            />
          }
        />

        <Route
          path="/research-admin"
          element={
            <Navigate
              to="/admin/research"
              replace
            />
          }
        />

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />
      </Routes>

      <EnquiryModal
        open={enquiryOpen}
        onClose={closeEnquiryForm}
      />
    </>
  );
}