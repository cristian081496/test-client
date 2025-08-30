import { useState } from 'react';
import { useUploadZip } from '../hooks/useUsers';
import { Upload as UploadIcon, Check, AlertCircle, FileText } from 'lucide-react';

const Upload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  
  const uploadMutation = useUploadZip();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/zip' || file.name.endsWith('.zip')) {
        setSelectedFile(file);
      }
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('zipFile', selectedFile);

    uploadMutation.mutate(formData, {
      onSuccess: () => {
        setSelectedFile(null);
      }
    });
  };

  const resetFile = () => {
    setSelectedFile(null);
    uploadMutation.reset();
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Upload Data</h1>
        <p className="mt-1 text-gray-600">
          Upload ZIP files containing user data, transactions, and avatars
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleUpload}>
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center ${
              dragActive
                ? 'border-blue-400 bg-blue-50'
                : selectedFile
                ? 'border-green-400 bg-green-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {selectedFile ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <FileText className="w-12 h-12 text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={resetFile}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Remove file
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <UploadIcon className="w-12 h-12 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    Drag and drop a ZIP file here, or{' '}
                    <label className="text-blue-600 hover:text-blue-500 cursor-pointer">
                      browse
                      <input
                        type="file"
                        className="sr-only"
                        accept=".zip"
                        onChange={handleFileSelect}
                      />
                    </label>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    ZIP files only, up to 10MB
                  </p>
                </div>
              </div>
            )}
          </div>

          {uploadMutation.isSuccess && (
            <div className="mt-4 bg-green-50 border border-green-200 rounded-md p-4">
              <div className="flex items-center">
                <Check className="w-5 h-5 text-green-400" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    File uploaded successfully!
                  </p>
                  <p className="text-sm text-green-700 mt-1">
                    {uploadMutation.data?.data?.message}
                  </p>
                </div>
              </div>
            </div>
          )}

          {uploadMutation.isError && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">
                    Upload failed
                  </p>
                  <p className="text-sm text-red-700 mt-1">
                    {uploadMutation.error?.response?.data?.error || 
                     uploadMutation.error?.message || 
                     'Something went wrong'}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={!selectedFile || uploadMutation.isPending}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {uploadMutation.isPending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <UploadIcon className="w-4 h-4 mr-2" />
                  Upload File
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 border-t pt-6">
          <h3 className="text-sm font-medium text-gray-900 mb-3">
            Required ZIP file contents:
          </h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• <code className="bg-gray-100 px-2 py-1 rounded">userData.json</code> - User information</li>
            <li>• <code className="bg-gray-100 px-2 py-1 rounded">transactions.json</code> - Transaction records</li>
            <li>• <code className="bg-gray-100 px-2 py-1 rounded">avatar.png</code> - User avatar image</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Upload;