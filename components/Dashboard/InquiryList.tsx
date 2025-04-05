// Define Inquiry type directly inside this file
interface Inquiry {
    id: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    status: 'new' | 'responded';
    date: string;
  }
  
  interface Props {
    inquiries: Inquiry[];
    handleMarkAsResponded: (id: string) => void;
    handleDeleteInquiry: (id: string) => void;
  }
  
  export default function InquiryList({ inquiries, handleMarkAsResponded, handleDeleteInquiry }: Props) {
    return (
      <div className="space-y-4">
        {inquiries.map((inquiry) => (
          <div
            key={inquiry.id}
            className={`bg-gray-50 dark:bg-gray-800 rounded-lg p-4 ${inquiry.status === 'new' ? 'border-l-4 border-primary' : ''}`}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{inquiry.name}</h3>
                <p>{inquiry.email} • {inquiry.phone}</p>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${inquiry.status === 'new' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                {inquiry.status === 'new' ? 'New' : 'Responded'}
              </span>
            </div>
            <p>{inquiry.message}</p>
            <div className="flex justify-between items-center">
              <p>Received: {new Date(inquiry.date).toLocaleDateString()}</p>
              <div className="flex space-x-2">
                {inquiry.status === 'new' && (
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-md"
                    onClick={() => handleMarkAsResponded(inquiry.id)}
                  >
                    Mark as Responded
                  </button>
                )}
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-md"
                  onClick={() => handleDeleteInquiry(inquiry.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  