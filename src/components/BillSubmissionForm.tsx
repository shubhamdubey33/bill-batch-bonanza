
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DatePickerField } from "./DatePickerField";
import { TimePickerField } from "./TimePickerField";
import { CurrencyInputField } from "./CurrencyInputField";
import { FileUploadField } from "./FileUploadField";
import { PersonSelectionField } from "./PersonSelectionField";
import { BaseBill, Bill, PersonInvolved } from "@/types/bill";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface BillSubmissionFormProps {
  isOpen: boolean;
  onClose: () => void;
}

type BillType = "food" | "cab" | "stay" | "miscellaneous" | "bike";

const billTypeLabels: Record<BillType, string> = {
  food: "Food",
  cab: "Cab",
  stay: "Stay",
  miscellaneous: "Miscellaneous",
  bike: "Bike"
};

// Fixed amount for bike bills
const BIKE_FIXED_AMOUNT = "150";

const BillSubmissionForm = ({ isOpen, onClose }: BillSubmissionFormProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("commonDetails");
  const [selectedTypes, setSelectedTypes] = useState<BillType[]>([]);
  
  // Common fields shared across all bill types
  const [commonFields, setCommonFields] = useState<Omit<BaseBill, "personsInvolved" | "status">>({
    date: undefined as unknown as Date,
    time: "",
    amount: 0,
    remark: "",
  });

  // Store specific fields for each bill type
  const [billSpecificFields, setBillSpecificFields] = useState<Record<BillType, any>>({
    food: { personsInvolved: [], attachedBill: undefined },
    cab: { personsInvolved: [], attachedBill: undefined },
    stay: { personsInvolved: [], attachedBill: undefined },
    miscellaneous: { personsInvolved: [], attachedBill: undefined },
    bike: { bikeNumber: "", personsInvolved: [] }
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
      // If adding bike, set fixed amount
      if (!prev.includes(type) && type === "bike") {
        handleCommonFieldChange("amount", BIKE_FIXED_AMOUNT);
      }
      
      // If removing bike and bike was the only type that determined the amount
      if (prev.includes(type) && type === "bike" && prev.length === 1) {
        handleCommonFieldChange("amount", 0);
      }
      
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
    
    if (!commonFields.amount) {
      newErrors.amount = "Amount is required";
    }
    
    // Validate bill-specific fields for each selected type
    selectedTypes.forEach(type => {
      // For all types except bike, validate personsInvolved
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
        amount: Number(commonFields.amount),
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
      amount: 0,
      remark: "",
    });
    setBillSpecificFields({
      food: { personsInvolved: [], attachedBill: undefined },
      cab: { personsInvolved: [], attachedBill: undefined },
      stay: { personsInvolved: [], attachedBill: undefined },
      miscellaneous: { personsInvolved: [], attachedBill: undefined },
      bike: { bikeNumber: "", personsInvolved: [] }
    });
    setErrors({});
    setActiveTab("commonDetails");
  };

  // Check if current tab is the last one
  const isLastTab = () => {
    return activeTab === selectedTypes[selectedTypes.length - 1];
  };

  // Determine if amount field should be editable
  const isAmountFieldEditable = () => {
    // If bike is the only selected type, amount is not editable
    return !(selectedTypes.length === 1 && selectedTypes[0] === "bike");
  };

  // Render tab content for common details
  const renderCommonDetailsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <div>
          <Label className="mb-2 block">Bill Types</Label>
          <div className="flex flex-wrap gap-4">
            {(Object.keys(billTypeLabels) as BillType[]).map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox 
                  id={`bill-type-${type}`} 
                  checked={selectedTypes.includes(type)}
                  onCheckedChange={() => toggleBillType(type)}
                />
                <label
                  htmlFor={`bill-type-${type}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {billTypeLabels[type]}
                </label>
              </div>
            ))}
          </div>
          {errors.billType && <p className="text-sm text-destructive mt-2">{errors.billType}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DatePickerField
            label="Date"
            value={commonFields.date}
            onChange={(date) => handleCommonFieldChange("date", date)}
            error={errors.date}
          />
          
          <TimePickerField
            label="Time"
            value={commonFields.time}
            onChange={(time) => handleCommonFieldChange("time", time)}
            error={errors.time}
          />
        </div>

        {isAmountFieldEditable() ? (
          <CurrencyInputField
            label="Amount (₹)"
            value={commonFields.amount.toString()}
            onChange={(value) => handleCommonFieldChange("amount", value)}
            error={errors.amount}
          />
        ) : (
          <div className="space-y-2">
            <Label htmlFor="fixed-amount">Amount (₹)</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center text-sm text-muted-foreground">
                ₹
              </div>
              <Input
                id="fixed-amount"
                type="text"
                value={BIKE_FIXED_AMOUNT}
                readOnly
                className="pl-8 bg-gray-50"
              />
            </div>
            <p className="text-xs text-muted-foreground">Fixed amount for bike bills</p>
          </div>
        )}

        <div>
          <Label htmlFor="remark">Remark</Label>
          <Textarea
            id="remark"
            placeholder="Enter any additional information..."
            value={commonFields.remark}
            onChange={(e) => handleCommonFieldChange("remark", e.target.value)}
            className="resize-none min-h-[100px]"
          />
        </div>
      </div>
    </div>
  );

  // Render tab content for specific bill types
  const renderBillTypeTab = (type: BillType) => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">{billTypeLabels[type]} Bill Details</h3>
      
      <div className="grid grid-cols-1 gap-6">
        {type === "bike" ? (
          <div>
            <Label htmlFor="bikeNumber">Bike Number</Label>
            <Input
              id="bikeNumber"
              placeholder="Enter bike number"
              value={billSpecificFields.bike.bikeNumber}
              onChange={(e) => handleSpecificFieldChange("bike", "bikeNumber", e.target.value)}
              className={errors.bike_number ? "border-destructive" : ""}
            />
            {errors.bike_number && <p className="text-sm text-destructive mt-1">{errors.bike_number}</p>}
          </div>
        ) : (
          <FileUploadField
            label="Attach Bill"
            value={billSpecificFields[type].attachedBill}
            onChange={(file) => handleSpecificFieldChange(type, "attachedBill", file)}
          />
        )}
        
        <PersonSelectionField
          label="Persons Involved"
          value={billSpecificFields[type].personsInvolved}
          onChange={(persons) => handleSpecificFieldChange(type, "personsInvolved", persons)}
          error={errors[`${type}_persons`]}
        />
      </div>
    </div>
  );

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
            {renderCommonDetailsTab()}
          </TabsContent>
          
          {selectedTypes.map((type) => (
            <TabsContent key={type} value={type}>
              {renderBillTypeTab(type)}
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="flex justify-between mt-6">
          {activeTab !== "commonDetails" ? (
            <Button 
              type="button" 
              variant="outline" 
              onClick={handlePrevious}
            >
              Previous
            </Button>
          ) : (
            <div></div>
          )}
          
          {isLastTab() ? (
            <Button type="button" onClick={handleSubmit}>
              Submit Bills
            </Button>
          ) : (
            <Button type="button" onClick={handleNext}>
              Next
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BillSubmissionForm;
