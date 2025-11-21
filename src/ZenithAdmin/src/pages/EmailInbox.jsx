import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Search, Eye, Trash2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const API_BASE_URL = 'https://zenithscs.com.au/api';

const EmailInbox = () => {
  const { toast } = useToast();
  const [emails, setEmails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [itemToDelete, setItemToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const fetchEmails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/get-emails.php?page=${currentPage}&limit=50&search=${searchTerm}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const result = await response.json();
      
      if (result.success) {
        setEmails(result.data);
        setTotalCount(result.total);
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to fetch emails",
          variant: "destructive",
        });
        
        // If unauthorized, redirect to login
        if (result.code === 'AUTH_REQUIRED') {
          window.location.reload();
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to connect to server",
        variant: "destructive",
      });
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, [currentPage]);

  const itemsPerPage = 5;
  const filteredData = emails;
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = emails;

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/delete-email.php`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast({
          title: "Email Deleted",
          description: "The email has been successfully removed.",
        });
        fetchEmails(); // Refresh the list
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to delete email",
          variant: "destructive",
        });
        
        // If unauthorized, redirect to login
        if (result.code === 'AUTH_REQUIRED') {
          window.location.reload();
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete email",
        variant: "destructive",
      });
      console.error('Delete error:', error);
    } finally {
      setItemToDelete(null);
    }
  };
  
  const handleView = (item) => {
    toast({
      title: `Email from ${item.sender}`,
      description: item.message || `Subject: ${item.subject}`,
    });
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchEmails();
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Email Inbox ({totalCount})</h1>
        <div className="flex gap-2 items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search emails..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border-none rounded-lg text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
            />
          </div>
          <Button onClick={handleSearch} variant="outline" size="icon">
            <Search className="w-4 h-4" />
          </Button>
          <Button onClick={fetchEmails} variant="outline" size="icon" disabled={loading}>
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto text-blue-500" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading emails...</p>
        </div>
      ) : paginatedData.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">No emails found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b dark:border-gray-700">
              <th className="py-3 px-4 text-gray-500 dark:text-gray-400 font-semibold">Sender</th>
              <th className="py-3 px-4 text-gray-500 dark:text-gray-400 font-semibold hidden sm:table-cell">Email</th>
              <th className="py-3 px-4 text-gray-500 dark:text-gray-400 font-semibold">Subject</th>
              <th className="py-3 px-4 text-gray-500 dark:text-gray-400 font-semibold hidden md:table-cell">Date</th>
              <th className="py-3 px-4 text-gray-500 dark:text-gray-400 font-semibold hidden lg:table-cell">Phone</th>
              <th className="py-3 px-4 text-gray-500 dark:text-gray-400 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <motion.tr
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <td className="py-3 px-4 text-gray-800 dark:text-gray-200 font-medium">{item.sender}</td>
                <td className="py-3 px-4 text-gray-600 dark:text-gray-300 hidden sm:table-cell">{item.email}</td>
                <td className="py-3 px-4 text-gray-800 dark:text-gray-200">{item.subject}</td>
                <td className="py-3 px-4 text-gray-600 dark:text-gray-300 hidden md:table-cell">{item.date}</td>
                <td className="py-3 px-4 text-gray-600 dark:text-gray-300 hidden lg:table-cell">{item.phone}</td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <button onClick={() => handleView(item)} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors" title="View"><Eye className="w-5 h-5 text-blue-500" /></button>
                    <button onClick={() => setItemToDelete(item.id)} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors" title="Delete"><Trash2 className="w-5 h-5 text-red-500" /></button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0">
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, totalCount)} of {totalCount} emails
        </p>
        <div className="flex space-x-2">
          <Button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1 || loading} variant="outline" className="dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"><ChevronLeft className="w-4 h-4" /></Button>
          <span className="px-4 py-2 text-gray-700 dark:text-gray-300">Page {currentPage} of {totalPages}</span>
          <Button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages || loading} variant="outline" className="dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"><ChevronRight className="w-4 h-4" /></Button>
        </div>
      </div>

      <AlertDialog open={itemToDelete !== null} onOpenChange={() => setItemToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the email.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDelete(itemToDelete)}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EmailInbox;