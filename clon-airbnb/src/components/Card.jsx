const LoggedHome = ({ user }) => {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Bienvenido, {user.email}</h1>
            {/* Aquí van las tarjetas de casas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Simulación de tarjeta */}
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <img src="https://th.bing.com/th/id/R.61e705efc28f2b57f80770aee908f704?rik=eVcEjYdVIlGlig&riu=http%3a%2f%2fdecorandocasas.com.br%2fwp-content%2fuploads%2f2014%2f03%2ffachadas-de-casas-bonitas4.jpg&ehk=jlbkMalj08xz%2fXDTwpz48I3jGi2HlfIE52QHtzP4aio%3d&risl=&pid=ImgRaw&r=0" alt="Casa" className="w-full h-48 object-cover"/>
                    <div className="p-4">
                        <h2 className="text-xl font-semibold">Casa Moderna</h2>
                        <p className="text-gray-600">3 habitaciones • 2 baños • $1200/mes</p>
                    </div>
                </div>
                {/* Puedes mapear más tarjetas desde un array */}
            </div>
        </div>
    )
}

export default LoggedHome;