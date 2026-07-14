import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTasks } from '../hooks/useTasks';
import { TaskCard } from './TaskCard';
import { Task, TaskStatus } from '../types';
import { Plus, X, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function TaskBoard() {
  const { tasks, loading, addTask, updateTaskStatus, updateTask, deleteTask } = useTasks();
  const { user } = useAuth();
  const [isAdding, setIsAdding] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [formData, setFormData] = useState({ title: '', description: '' });

  const columns: { id: TaskStatus; title: string; color: string; countColor: string }[] = [
    { id: 'todo', title: 'To Do', color: 'bg-slate-200 text-slate-600', countColor: 'bg-slate-200 text-slate-600' },
    { id: 'in-progress', title: 'In Progress', color: 'bg-indigo-100 text-indigo-600', countColor: 'bg-indigo-100 text-indigo-600' },
    { id: 'done', title: 'Done', color: 'bg-emerald-100 text-emerald-600', countColor: 'bg-emerald-100 text-emerald-600' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (editingTask) {
      await updateTask(editingTask.id, formData);
      setEditingTask(null);
    } else {
      await addTask(formData.title, formData.description);
      setIsAdding(false);
    }
    setFormData({ title: '', description: '' });
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setFormData({ title: task.title, description: task.description || '' });
    setIsAdding(true);
  };

  const closeForm = () => {
    setIsAdding(false);
    setEditingTask(null);
    setFormData({ title: '', description: '' });
  };

  const firstName = user?.displayName?.split(' ')[0] || 'there';

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-400">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Good morning, {firstName}</h1>
          <p className="text-slate-500 text-sm">
            You have <span className="text-indigo-600 font-semibold">{tasks.filter(t => t.status !== 'done').length} active tasks</span> remaining for today.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            <Plus size={16} />
            Create New Task
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-8"
          >
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative">
              <button
                onClick={closeForm}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors"
              >
                <X size={16} />
              </button>
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                {editingTask ? 'Edit Task' : 'Create New Task'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                    placeholder="What needs to be done?"
                    autoFocus
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">
                    Description (optional)
                  </label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none h-24"
                    placeholder="Add more details..."
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={!formData.title.trim()}
                    className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                  >
                    {editingTask ? 'Save Changes' : 'Create Task'}
                  </button>
                  <button
                    type="button"
                    onClick={closeForm}
                    className="bg-white text-slate-600 border border-slate-200 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {columns.map(column => (
          <div key={column.id} className="flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-sm font-bold text-slate-800 uppercase tracking-widest">{column.title}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${column.countColor}`}>
                {tasks.filter(t => t.status === column.id).length}
              </span>
            </div>
            
            <div className="flex flex-col gap-4 min-h-[200px]">
              <AnimatePresence>
                {tasks
                  .filter(task => task.status === column.id)
                  .map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onUpdateStatus={updateTaskStatus}
                      onDelete={deleteTask}
                      onEdit={handleEdit}
                    />
                  ))}
              </AnimatePresence>
              
              {tasks.filter(t => t.status === column.id).length === 0 && (
                <div className="h-24 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-sm text-slate-400">
                  No tasks
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
