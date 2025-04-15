
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { FormNavigation } from "./bill-submission-form/FormNavigation";
import { useBillForm } from "@/hooks/useBillForm";
import { BillFormTabs } from "./bill-submission-form/BillFormTabs";

interface BillSubmissionFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const BillSubmissionForm = ({ isOpen, onClose }: BillSubmissionFormProps) => {
  const {
    activeTab,
    setActiveTab,
    selectedTypes,
    commonFields,
    billSpecificFields,
    errors,
    handleCommonFieldChange,
    handleSpecificFieldChange,
    toggleBillType,
    handleNext,
    handlePrevious,
    isLastTab,
    handleSubmit
  } = useBillForm(onClose);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Upload Batch Bills</DialogTitle>
          <DialogDescription>
            Fill in the details for your expense claims
          </DialogDescription>
        </DialogHeader>
        
        <BillFormTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedTypes={selectedTypes}
          toggleBillType={toggleBillType}
          commonFields={commonFields}
          handleCommonFieldChange={handleCommonFieldChange}
          billSpecificFields={billSpecificFields}
          handleSpecificFieldChange={handleSpecificFieldChange}
          errors={errors}
        />
        
        <FormNavigation 
          activeTab={activeTab}
          isLastTab={isLastTab()}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
          handleSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};

export default BillSubmissionForm;
