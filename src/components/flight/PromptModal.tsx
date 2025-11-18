interface PromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  actionName: string;
  isBlocked: boolean;
  isCompleted: boolean;
}

export function PromptModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  actionName, 
  isBlocked, 
  isCompleted 
}: PromptModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgb(0,0,0,0.4)] flex items-center justify-center z-50">
      <div className="bg-bg-surface rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            {isBlocked ? "Action Blocked" : isCompleted ? "Uncheck Action" : "Confirm Action"}
          </h3>
          
          {isBlocked ? (
            <p className="text-text-secondary mb-6">
              Please complete the previous step before proceeding to {actionName}.
            </p>
          ) : isCompleted ? (
            <p className="text-text-secondary mb-6">
              Are you sure you want to uncheck {actionName}? This will also uncheck all subsequent actions.
            </p>
          ) : (
            <p className="text-text-secondary mb-6">
              Are you sure you want to proceed with {actionName}?
            </p>
          )}

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-text-secondary bg-bg-secondary rounded-md hover:bg-bg-tertiary transition-colors"
            >
              {isBlocked ? "OK" : "Cancel"}
            </button>
            {!isBlocked && (
              <button
                onClick={onConfirm}
                className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors ${
                  isCompleted 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isCompleted ? "Uncheck" : "Confirm"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}