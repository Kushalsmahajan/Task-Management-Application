import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Task, TaskStatus } from '../types';
import { MoreVertical, Trash2, Edit2, Check } from 'lucide-react';
import { format } from 'date-fns';

interface TaskCardProps {
  task: Task;
  onUpdateStatus: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

export function TaskCard({ task, onUpdateStatus, onDelete, onEdit }: TaskCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdateStatus(task.id, e.target.value as TaskStatus);
  };

  // Status specific styling based on the target design
  const getCardStyle = () => {
    if (task.status === 'todo') {
      return 'bg-white rounded-xl shadow-sm border border-slate-100 hover:border-indigo-200';
    } else if (task.status === 'in-progress') {
      return 'bg-white rounded-xl shadow-sm border-l-4 border-l-indigo-500 border border-slate-100';
    } else {
      return 'bg-slate-50 rounded-xl border border-slate-200 opacity-60';
    }
  };

  const getTitleStyle = () => {
    if (task.status === 'done') {
      return 'text-sm font-semibold text-slate-400 leading-snug line-through pr-6';
    }
    return 'text-sm font-semibold text-slate-800 leading-snug pr-6';
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`p-5 relative group transition-colors ${getCardStyle()}`}
    >
      <div className="flex justify-between items-start mb-3">
        {task.status === 'todo' && (
          <span className="px-2 py-1 bg-amber-50 text-amber-600 text-[10px] font-bold rounded uppercase">
            Pending
          </span>
        )}
        {task.status === 'in-progress' && (
          <span className="px-2 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded uppercase">
            Active
          </span>
        )}
        {task.status === 'done' && (
          <div className="flex items-center gap-1.5">
            <Check size={12} className="text-emerald-500" strokeWidth={3} />
            <span className="text-[10px] font-bold text-emerald-600 uppercase">Finished</span>
          </div>
        )}
        
        <span className="text-[10px] text-slate-400 font-medium">
          {format(task.createdAt, 'MMM d')}
        </span>
      </div>

      <div className="relative">
        <h3 className={getTitleStyle()}>{task.title}</h3>
        <div className="absolute -top-1 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
          >
            <MoreVertical size={14} />
          </button>
          
          {isMenuOpen && (
            <div className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-lg border border-slate-100 py-1 z-20">
              <button
                onClick={() => {
                  onEdit(task);
                  setIsMenuOpen(false);
                }}
                className="w-full px-3 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
              >
                <Edit2 size={12} /> Edit
              </button>
              <button
                onClick={() => {
                  onDelete(task.id);
                  setIsMenuOpen(false);
                }}
                className="w-full px-3 py-2 text-left text-xs font-medium text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <Trash2 size={12} /> Delete
              </button>
            </div>
          )}
        </div>
      </div>
      
      {task.description && (
        <p className="text-xs text-slate-500 mt-2 line-clamp-2">{task.description}</p>
      )}

      {task.status === 'in-progress' && (
        <div className="w-full bg-slate-100 h-1 rounded-full mt-4">
          <div className="bg-indigo-500 h-1 rounded-full w-1/2"></div>
        </div>
      )}

      {task.status !== 'in-progress' && (
        <div className="flex items-center gap-2 mt-4">
          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold ${
            task.status === 'done' ? 'bg-emerald-100 text-emerald-500' : 'bg-slate-100 text-slate-500'
          }`}>
            T
          </div>
          <span className="text-xs text-slate-400 font-medium">Task</span>
        </div>
      )}

      <div className="mt-4 pt-3 border-t border-slate-100/50 flex justify-end">
        <select
          value={task.status}
          onChange={handleStatusChange}
          className="text-[10px] font-bold px-2 py-1 rounded bg-slate-100 text-slate-600 border-none cursor-pointer focus:ring-0 uppercase tracking-wide"
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
    </motion.div>
  );
}
