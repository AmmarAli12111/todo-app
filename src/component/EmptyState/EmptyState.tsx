
function EmptyState() {
  return (
    <div role="status" aria-label="No tasks available" className="empty-state flex flex-col items-center justify-center p-10 text-center animate-slide-bottom">
      <div className="empty-state-icon flex justify-center items-center w-12 h-12 rounded-full mb-4 text-2xl text-gray-400 bg-[#db4c3f]">📋</div>
      <h3 className="empty-state-title text-[#1c1917] text-xl font-semibold mb-1">No tasks yet</h3>
      <p className="empty-state-text max-w-80 text-[#57534e] text-sm font-normal">Start by adding your first task</p>
    </div>
  );
}

export default EmptyState;
