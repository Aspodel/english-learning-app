import { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { vocabularyApi } from '../api/vocabulary.api';

export function VocabulariesList() {
  const { data: vocabList, isLoading } = vocabularyApi.useSearch({
    queryParams: { pageSize: '100' },
  });
  const { deleteMutation } = vocabularyApi.useDelete();
  const queryClient = useQueryClient();

  const [selected, setSelected] = useState<null | Vocabulary>(null);
  const [editing, setEditing] = useState<null | Vocabulary>(null);
  const [deleting, setDeleting] = useState<null | Vocabulary>(null);

  // Mutation for edit
  const editMutation = useMutation({
    mutationFn: async (data: Vocabulary) => {
      await fetch(`/api/vocabulary/${data.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vocabulary'] });
      setEditing(null);
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className='space-y-2 grid grid-cols-4'>
      {vocabList?.items.map((vocab) => (
        <Card key={vocab.id} className='flex items-center justify-between p-3'>
          <div
            onClick={() => setSelected(vocab)}
            className='cursor-pointer flex-1'
          >
            <p className='font-medium'>{vocab.text}</p>
            <p className='text-sm text-muted-foreground truncate'>
              {vocab.ipa}
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' size='icon'>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem onClick={() => setEditing(vocab)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className='text-destructive'
                onClick={() => setDeleting(vocab)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Card>
      ))}

      {/* ----- Details Dialog ----- */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent>
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>{selected.text}</DialogTitle>
              </DialogHeader>
              <p className='mt-2'>{selected.ipa}</p>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* ----- Edit Dialog ----- */}
      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent>
          {editing && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const text = (form.text as HTMLInputElement).value;
                const ipa = (form.ipa as HTMLInputElement).value;
                editMutation.mutate({ ...editing, text, ipa });
              }}
            >
              <DialogHeader>
                <DialogTitle>Edit Vocabulary</DialogTitle>
              </DialogHeader>
              <div className='space-y-3 mt-2'>
                <div>
                  <Label htmlFor='text'>Word</Label>
                  <Input name='text' defaultValue={editing.text} required />
                </div>
                <div>
                  <Label htmlFor='ipa'>IPA</Label>
                  <Input
                    name='ipa'
                    defaultValue={editing.ipa}
                    required
                  />
                </div>
              </div>
              <DialogFooter className='mt-4'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => setEditing(null)}
                >
                  Cancel
                </Button>
                <Button type='submit' disabled={editMutation.isPending}>
                  Save
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* ----- Delete Confirm Dialog ----- */}
      <Dialog open={!!deleting} onOpenChange={(o) => !o && setDeleting(null)}>
        <DialogContent>
          {deleting && (
            <>
              <DialogHeader>
                <DialogTitle>Delete Vocabulary</DialogTitle>
              </DialogHeader>
              <p>
                Are you sure you want to delete <strong>{deleting.text}</strong>
                ?
              </p>
              <DialogFooter className='mt-4'>
                <Button variant='outline' onClick={() => setDeleting(null)}>
                  Cancel
                </Button>
                <Button
                  variant='destructive'
                  onClick={() => {
                    deleteMutation.mutate({ id: deleting.id });
                    setDeleting(null);
                  }}
                  disabled={deleteMutation.isPending}
                >
                  Delete
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
