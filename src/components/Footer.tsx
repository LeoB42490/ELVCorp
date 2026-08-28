import { Link } from "react-router-dom";

function Footer() {

    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-600">© 2026 HostBuster. Tous droits réservés.</p>
                    <div className="flex gap-6 text-sm text-gray-600">
                        {/* @TODO Modifier les lien href */}
                        <Link to="/support" className="hover:text-blue-600 transition"> Contact </Link>
                        <Link to="/cgu" className="hover:text-blue-600 transition"> CGU </Link>
                        <Link to="/cgv" className="hover:text-blue-600 transition"> CGV </Link>
                        <Link to="/mentions-legales" className="hover:text-blue-600 transition"> Mentions légales </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;