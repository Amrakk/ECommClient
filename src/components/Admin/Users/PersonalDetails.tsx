export default function PersonalDetails() {
    const customer = {} as any;
    let isBanned = false;
    return (
        <div className="flex gap-6 bg-white shadow rounded-lg p-6">
            <div className="bg-gray-300 flex items-center justify-center w-64 h-64 rounded-lg overflow-hidden">
                <span className="text-gray-700 font-semibold text-xl">Customer's Avatar</span>
            </div>

            <div className="flex-1 bg-gray-50 rounded-lg p-6 shadow-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Customer Information</h2>
                <p className="text-gray-600 mb-1">
                    <span className="font-semibold">ID:</span> {customer?.id ?? 1}
                </p>
                <p className="text-gray-600 mb-1">
                    <span className="font-semibold">Name:</span> {customer?.name ?? "John Doe"}
                </p>
                <p className="text-gray-600 mb-1">
                    <span className="font-semibold">Email:</span> {customer?.email ?? "asdf"}
                </p>
                <p className="text-gray-600 mb-1">
                    <span className="font-semibold">Phone Number:</span> {customer?.phoneNumber ?? "asdf"}
                </p>
                <p className="text-gray-600 mb-1">
                    <span className="font-semibold">Date of Birth:</span> {customer?.dateOfBirth ?? "asdf"}
                </p>
                <p className="text-gray-600 mb-1">
                    <span className="font-semibold">Address:</span> {customer?.address ?? "asdf"}
                </p>
                <div className="mt-6 flex space-x-4">
                    <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-lg shadow transition">
                        Update
                    </button>
                    <button
                        className={`px-6 py-2 rounded-lg shadow transition ${
                            isBanned ? "bg-green-500 text-white" : "bg-red-500 text-white"
                        }`}
                        // onClick={handleBanToggle}
                    >
                        {isBanned ? "Activate" : "Ban"}
                    </button>
                </div>
            </div>
        </div>
    );
}
