export function getAircraftClasses(color: string) {
  if (color === "blue") return "bg-blue-700 border-blue-800";
  if (color === "green") return "bg-green-600 border-green-700";
  if (color === "orange") return "bg-orange-600 border-orange-700";
  return "bg-slate-600 border-slate-700";
}

export function getHoldClasses(type: string) {
  if (type === "Maintenance") {
    return "border-purple-300 bg-purple-50 text-purple-700";
  }

  if (type === "Training") {
    return "border-teal-300 bg-teal-50 text-teal-700";
  }

  return "border-slate-300 bg-slate-50 text-slate-500 border-dashed opacity-70";
}
