function Footer() {

    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-600">© 2026 HostBuster. Tous droits réservés.</p>
                    <div className="flex gap-6 text-sm text-gray-600">
                        {/* @TODO Modifier les lien href */}
                        <a href="#" className="hover:text-blue-600 transition">Contact</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;