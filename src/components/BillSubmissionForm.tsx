
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Bill, PersonInvolved } from "@/types/bill";
import { useToast } from "@/hooks/use-toast";
import { BaseBillFormFields, BillSpecificFields } from "./bill-submission-form/types";
import { BillTypeSelector } from "./bill-submission-form/BillTypeSelector";
import { CommonDetailsForm } from "./bill-submission-form/CommonDetailsForm";
import { BillTypeForm } from "./bill-submission-form/BillTypeForms";
import { FormNavigation } from "./bill-submission-form/FormNavigation";
import { BillType, billTypeLabels, BIKE_FIXED_AMOUNT } from "./bill-submission-form/bill-types";

interface BillSubmissionFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const BillSubmissionForm = ({ isOpen, onClose }: BillSubmissionFormProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("commonDetails");
  const [selectedTypes, setSelectedTypes] = useState<BillType[]>([]);
  
  // Common fields shared across all bill types
  const [commonFields, setCommonFields] = useState<Omit<BaseBillFormFields, "amount" | "personsInvolved" | "status">>({
    date: undefined as unknown as Date,
    time: "",
    remark: "",
  });

  // Store specific fields for each bill type
  const [billSpecificFields, setBillSpecificFields] = useState<BillSpecificFields>({
    food: { amount: "0", personsInvolved: [], attachedBill: undefined },
    cab: { amount: "0", personsInvolved: [], attachedBill: undefined },
    stay: { amount: "0", personsInvolved: [], attachedBill: undefined },
    miscellaneous: { amount: "0", personsInvolved: [], attachedBill: undefined },
    bike: { amount: BIKE_FIXED_AMOUNT, bikeNumber: "", personsInvolved: [] }
  });

  // Form validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle common fields changes
  const handleCommonFieldChange = (field: keyof typeof commonFields, value: any) => {
    setCommonFields(prev => ({ ...prev, [field]: value }));
  };

  // Handle specific fields changes for a bill type
  const handleSpecificFieldChange = (type: BillType, field: string, value: any) => {
    setBillSpecificFields(prev => ({
      ...prev,
      [type]: { ...prev[type], [field]: value }
    }));
  };

  // Toggle bill type selection
  const toggleBillType = (type: BillType) => {
    setSelectedTypes(prev => {
      return prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type];
    });
  };

  // Validate the form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Validate common fields
    if (!commonFields.date) {
      newErrors.date = "Date is required";
    }
    
    if (!commonFields.time) {
      newErrors.time = "Time is required";
    }
    
    // Validate bill-specific fields for each selected type
    selectedTypes.forEach(type => {
      // Validate amount for each bill type
      if (!billSpecificFields[type].amount || parseInt(billSpecificFields[type].amount) <= 0) {
        newErrors[`${type}_amount`] = "Amount is required";
      }
      
      // For all types, validate personsInvolved
      if (billSpecificFields[type].personsInvolved.length === 0) {
        newErrors[`${type}_persons`] = "At least one person must be selected";
      }
      
      // For bike type, validate bikeNumber
      if (type === "bike" && !billSpecificFields.bike.bikeNumber) {
        newErrors.bike_number = "Bike number is required";
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Navigate to next tab
  const handleNext = () => {
    if (activeTab === "commonDetails") {
      if (selectedTypes.length === 0) {
        setErrors({ billType: "Please select at least one bill type" });
        return;
      }
      setActiveTab(selectedTypes[0]);
    } else {
      const currentIndex = selectedTypes.indexOf(activeTab as BillType);
      if (currentIndex < selectedTypes.length - 1) {
        setActiveTab(selectedTypes[currentIndex + 1]);
      }
    }
  };

  // Navigate to previous tab
  const handlePrevious = () => {
    if (activeTab === selectedTypes[0]) {
      setActiveTab("commonDetails");
    } else {
      const currentIndex = selectedTypes.indexOf(activeTab as BillType);
      if (currentIndex > 0) {
        setActiveTab(selectedTypes[currentIndex - 1]);
      }
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Create bill objects for each selected type
    const bills: Bill[] = selectedTypes.map(type => {
      const baseFields = {
        ...commonFields,
        status: "validator_pending" as const,
        amount: Number(billSpecificFields[type].amount),
      };
      
      if (type === "bike") {
        return {
          ...baseFields,
          kind: "bike",
          bikeNumber: billSpecificFields.bike.bikeNumber,
          personsInvolved: billSpecificFields.bike.personsInvolved
        };
      } else {
        return {
          ...baseFields,
          kind: type,
          personsInvolved: billSpecificFields[type].personsInvolved,
          attachedBill: billSpecificFields[type].attachedBill
        };
      }
    });
    
    // In a real app, we would send these bills to the API
    console.log("Submitting bills:", bills);
    
    toast({
      title: "Bills Submitted",
      description: `Successfully submitted ${bills.length} bill(s)`,
    });
    
    // Reset form and close dialog
    resetForm();
    onClose();
  };

  // Reset all form fields
  const resetForm = () => {
    setSelectedTypes([]);
    setCommonFields({
      date: undefined as unknown as Date,
      time: "",
      remark: "",
    });
    setBillSpecificFields({
      food: { amount: "0", personsInvolved: [], attachedBill: undefined },
      cab: { amount: "0", personsInvolved: [], attachedBill: undefined },
      stay: { amount: "0", personsInvolved: [], attachedBill: undefined },
      miscellaneous: { amount: "0", personsInvolved: [], attachedBill: undefined },
      bike: { amount: BIKE_FIXED_AMOUNT, bikeNumber: "", personsInvolved: [] }
    });
    setErrors({});
    setActiveTab("commonDetails");
  };

  // Check if current tab is the last one
  const isLastTab = () => {
    return activeTab === selectedTypes[selectedTypes.length - 1];
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Upload Batch Bills</DialogTitle>
          <DialogDescription>
            Fill in the details for your expense claims
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4 grid grid-cols-5">
            <TabsTrigger value="commonDetails">Common</TabsTrigger>
            {selectedTypes.map((type) => (
              <TabsTrigger key={type} value={type}>
                {billTypeLabels[type]}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="commonDetails">
            <div className="space-y-6">
              <BillTypeSelector 
                selectedTypes={selectedTypes}
                toggleBillType={toggleBillType}
                error={errors.billType}
              />
              <CommonDetailsForm
                commonFields={commonFields}
                handleCommonFieldChange={handleCommonFieldChange}
                errors={errors}
              />
            </div>
          </TabsContent>
          
          {selectedTypes.map((type) => (
            <TabsContent key={type} value={type}>
              <BillTypeForm 
                type={type}
                billFields={billSpecificFields[type]}
                handleFieldChange={(field, value) => handleSpecificFieldChange(type, field, value)}
                errors={errors}
              />
            </TabsContent>
          ))}
        </Tabs>
        
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
