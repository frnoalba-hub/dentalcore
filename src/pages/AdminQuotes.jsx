import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { ArrowLeft, Loader2, MessageSquareQuote, Search, X, Save } from 'lucide-react';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const STATUS_OPTIONS = ['all', 'new', 'contacted', 'quoted', 'won', 'lost'];
const STATUS_COLORS = {
  new: 'bg-blue-100 text-blue-700',
  contacted: 'bg-amber-100 text-amber-700',
  quoted: 'bg-purple-100 text-purple-700',
  won: 'bg-green-100 text-green-700',
  lost: 'bg-gray-200 text-gray-700',
};

function QuoteRow({ quote }) {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState(quote.status || 'new');
  const [notes, setNotes] = useState(quote.notes || '');
  const createdAt = quote.created_date ? new Date(quote.created_date) : null;
  const ageMinutes = createdAt ? Math.max(0, Math.floor((Date.now() - createdAt.getTime()) / 60000)) : null;
  const isSlaOverdue = status === 'new' && ageMinutes != null && ageMinutes >= 15;

  const updateMutation = useMutation({
    mutationFn: (payload) => base44.entities.QuoteRequest.update(quote.id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-quotes'] });
      toast.success(`Quote ${quote.request_id || quote.id} updated`);
    },
    onError: () => {
      toast.error('Could not update quote status');
    },
  });

  const handleSave = () => {
    updateMutation.mutate({
      status,
      notes: notes.trim() || null,
    });
  };

  return (
    <div className={`bg-white border rounded-lg p-4 md:p-5 ${isSlaOverdue ? 'border-red-300 bg-red-50/40' : 'border-gray-200'}`}>
      <div className="flex flex-col md:flex-row md:items-start gap-3 md:gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-semibold text-sm text-gray-900">{quote.request_id || quote.id}</p>
            <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${STATUS_COLORS[quote.status] || 'bg-gray-100 text-gray-600'}`}>
              {(quote.status || 'new').replace(/_/g, ' ')}
            </span>
            {isSlaOverdue ? (
              <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                SLA overdue ({ageMinutes}m)
              </span>
            ) : null}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {(quote.contact_name || 'Unknown contact')}
            {quote.office_name ? ` · ${quote.office_name}` : ''}
            {quote.created_date ? ` · ${format(new Date(quote.created_date), 'MMM d, yyyy h:mm a')}` : ''}
          </p>

          <div className="mt-3 text-sm text-gray-700 whitespace-pre-wrap">{quote.request_details}</div>

          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-600">
            <p>Email: {quote.email || '-'}</p>
            <p>Phone: {quote.phone || '-'}</p>
            <p>Need-by: {quote.need_by || '-'}</p>
            <p>Source: {quote.source || '-'}</p>
            <p className="md:col-span-2 break-all">Source URL: {quote.source_page_url || '-'}</p>
          </div>
        </div>

        <div className="w-full md:w-[260px] space-y-3">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Pipeline Status</label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.filter((value) => value !== 'all').map((value) => (
                  <SelectItem key={value} value={value}>
                    {value.replace(/_/g, ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Internal Notes</label>
            <Textarea
              rows={4}
              className="bg-white"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Follow-up notes, quote sent date, owner, outcome..."
            />
          </div>
          <Button onClick={handleSave} disabled={updateMutation.isPending} className="w-full">
            {updateMutation.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function AdminQuotes() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const { data: quotes = [], isLoading } = useQuery({
    queryKey: ['admin-quotes'],
    queryFn: () => base44.entities.QuoteRequest.list('-created_date', 300),
  });

  const filteredQuotes = useMemo(() => {
    const q = search.trim().toLowerCase();
    return quotes.filter((quote) => {
      const matchesStatus = statusFilter === 'all' || quote.status === statusFilter;
      const matchesSearch =
        !q ||
        String(quote.request_id || '').toLowerCase().includes(q) ||
        String(quote.contact_name || '').toLowerCase().includes(q) ||
        String(quote.office_name || '').toLowerCase().includes(q) ||
        String(quote.email || '').toLowerCase().includes(q) ||
        String(quote.phone || '').toLowerCase().includes(q) ||
        String(quote.request_details || '').toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [quotes, search, statusFilter]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Link to="/admin/products" className="text-gray-400 hover:text-gray-700">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Quote Requests</h1>
            <p className="text-gray-500 mt-0.5 text-sm">{quotes.length} total requests</p>
          </div>
          <div className="ml-auto flex gap-2">
            <Link to="/admin/orders" className="text-sm bg-white border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700">
              Orders
            </Link>
            <Link to="/admin/dashboard" className="text-sm bg-white border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700">
              Dashboard
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by request ID, contact, office, email, phone, details..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="pl-10"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((status) => (
                <SelectItem key={status} value={status}>
                  {status === 'all' ? 'All statuses' : status.replace(/_/g, ' ')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {filteredQuotes.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <MessageSquareQuote className="w-12 h-12 mx-auto mb-3" />
            <p className="text-sm">{quotes.length === 0 ? 'No quote requests yet' : 'No quote requests match your filters'}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredQuotes.map((quote) => (
              <QuoteRow key={quote.id} quote={quote} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
