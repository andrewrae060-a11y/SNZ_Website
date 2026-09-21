import EnquiryModal from "../components/EnquiryModal";
import SNZFooter from "../components/SNZFooter";
import SNZHeader from "../components/SNZHeader";

export default function Contact({
  goToPage,
  openEnquiryForm,
}) {
  return (
    <>
      <SNZHeader
        goToPage={goToPage}
        openEnquiryForm={openEnquiryForm}
        activePage="Contact"
      />

      <main>
        <EnquiryModal open variant="page" />
      </main>

      <SNZFooter goToPage={goToPage} />
    </>
  );
}
