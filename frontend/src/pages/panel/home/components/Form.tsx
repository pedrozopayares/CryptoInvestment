export const FormOrder = () => {
  return (
    <div className="flex items-center justify-center">
        <form className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">ID de la compañia</label>
            <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option value="">Selecciona una opción</option>
              <option value="option1">Opción 1</option>
              <option value="option2">Opción 2</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">ID granjero</label>
            <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option value="">Selecciona una opción</option>
              <option value="option1">Opción 1</option>
              <option value="option2">Opción 2</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">ID cosechas</label>
            <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option value="">Selecciona una opción</option>
              <option value="option1">Opción 1</option>
              <option value="option2">Opción 2</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">expira</label>
            <input type="number" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Expira"/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Cantidad</label>
            <input type="number" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Cantidad"/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">ID unidad</label>
            <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option value="">Selecciona una opción</option>
              <option value="option1">Opción 1</option>
              <option value="option2">Opción 2</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Precio</label>
            <input type="number" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Precio"/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Divisa</label>
            <input type="number" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Divisa"/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Fecha de Creación</label>
            <input type="date" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Fecha de Actualización</label>
            <input type="date" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Estado</label>
            <input type="number" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Estado"/>
          </div>
        </form>
    </div>
  )
}
export default FormOrder;