import React, { useState, useEffect } from 'react';

export default function GroceryList({ week }) {
  const [groceries, setGroceries] = useState([]);
  const [customItem, setCustomItem] = useState('');

  useEffect(() => {
    if (!week || !week.days) return;

    const allIngredients = new Set();
    
    week.days.forEach(day => {
      if (day.meals && !day.isRestDay) {
        Object.values(day.meals).forEach(meal => {
          meal.ingredients.forEach(ingredient => {
            allIngredients.add(ingredient);
          });
        });
      }
    });

    const groceryItems = Array.from(allIngredients).map((item, index) => ({
      id: `auto-${index}`,
      name: item,
      checked: false
    }));

    setGroceries(groceryItems);
  }, [week]);

  const toggleCheck = (id) => {
    setGroceries(groceries.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const addCustomItem = (e) => {
    e.preventDefault();
    if (!customItem.trim()) return;

    const newItem = {
      id: `custom-${Date.now()}`,
      name: customItem.trim(),
      checked: false
    };

    setGroceries([...groceries, newItem]);
    setCustomItem('');
  };

  const removeItem = (id) => {
    setGroceries(groceries.filter(item => item.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-primary mb-6">Grocery List - Week {week?.weekNumber}</h2>

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={addCustomItem} className="mb-6 flex gap-2">
          <input
            type="text"
            value={customItem}
            onChange={(e) => setCustomItem(e.target.value)}
            placeholder="Add custom item..."
            className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
          >
            Add
          </button>
        </form>

        <div className="space-y-2">
          {groceries.length === 0 && (
            <p className="text-gray-500 text-center py-8">No items in your grocery list yet.</p>
          )}
          
          {groceries.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => toggleCheck(item.id)}
                  className="w-5 h-5 text-primary focus:ring-primary rounded"
                />
                <span className={`${item.checked ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                  {item.name}
                </span>
              </div>
              {item.id.startsWith('custom-') && (
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total Items:</span>
            <span className="font-semibold">{groceries.length}</span>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span className="text-gray-600">Checked:</span>
            <span className="font-semibold">{groceries.filter(item => item.checked).length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
