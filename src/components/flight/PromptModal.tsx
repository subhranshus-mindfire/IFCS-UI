interface PromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  actionName: string;
  isBlocked: boolean;
}

export function PromptModal({ isOpen, onClose, onConfirm, actionName, isBlocked }: PromptModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {isBlocked ? "Action Blocked" : "Confirm Action"}
          </h3>

          {isBlocked ? (
            <p className="text-gray-600 mb-6">
              Please complete the previous step before proceeding to {actionName}.
            </p>
          ) : (
            <p className="text-gray-600 mb-6">
              Are you sure you want to proceed with {actionName}?
            </p>
          )}

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              {isBlocked ? "OK" : "Cancel"}
            </button>
            {!isBlocked && (
              <button
                onClick={onConfirm}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
              >
                Confirm
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}