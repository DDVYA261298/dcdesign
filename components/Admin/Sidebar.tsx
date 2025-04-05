import { Button } from '@/components/ui/button';
import { Home, FileText, Users, Upload, Settings } from 'lucide-react';

export default function Sidebar() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4">
      <div className="flex flex-col space-y-1">
        <Button variant="ghost" className="justify-start">
          <Home className="mr-2 h-4 w-4" /> Dashboard
        </Button>
        <Button variant="ghost" className="justify-start">
          <FileText className="mr-2 h-4 w-4" /> Projects
        </Button>
        <Button variant="ghost" className="justify-start">
          <Users className="mr-2 h-4 w-4" /> Inquiries
        </Button>
        <Button variant="ghost" className="justify-start">
          <Upload className="mr-2 h-4 w-4" /> Media
        </Button>
        <Button variant="ghost" className="justify-start">
          <Settings className="mr-2 h-4 w-4" /> Settings
        </Button>
      </div>
    </div>
  );
}
