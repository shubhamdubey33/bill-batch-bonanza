
import { Button } from "@/components/ui/button";

interface FormNavigationProps {
  activeTab: string;
  isLastTab: boolean;
  handlePrevious: () => void;
  handleNext: () => void;
  handleSubmit: () => void;
}

export function FormNavigation({ 
  activeTab, 
  isLastTab, 
  handlePrevious, 
  handleNext, 
  handleSubmit 
}: FormNavigationProps) {
  return (
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
      
      {isLastTab ? (
        <Button type="button" onClick={handleSubmit}>
          Submit Bills
        </Button>
      ) : (
        <Button type="button" onClick={handleNext}>
          Next
        </Button>
      )}
    </div>
  );
}
