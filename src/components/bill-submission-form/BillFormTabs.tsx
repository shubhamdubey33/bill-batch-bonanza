
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BillType, billTypeLabels } from "./bill-types";
import { BillTypeSelector } from "./BillTypeSelector";
import { CommonDetailsForm } from "./CommonDetailsForm";
import { BillTypeForm } from "./BillTypeForms";
import { BillSpecificFields } from "./types";

interface BillFormTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  selectedTypes: BillType[];
  toggleBillType: (type: BillType) => void;
  commonFields: {
    date: Date | undefined;
    time: string;
    remark: string;
  };
  handleCommonFieldChange: (field: string, value: any) => void;
  billSpecificFields: BillSpecificFields;
  handleSpecificFieldChange: (type: BillType, field: string, value: any) => void;
  errors: Record<string, string>;
}

export function BillFormTabs({
  activeTab,
  setActiveTab,
  selectedTypes,
  toggleBillType,
  commonFields,
  handleCommonFieldChange,
  billSpecificFields,
  handleSpecificFieldChange,
  errors
}: BillFormTabsProps) {
  return (
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
  );
}
