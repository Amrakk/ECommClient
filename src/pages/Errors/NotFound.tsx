import sad from "@/assets/error/sad.png";
import { cp } from "fs";

interface NotFoundProps {
    isDark?: boolean;
}

export default function NotFound({ isDark = false }: NotFoundProps) {
    console.log(isDark);
    return (
        <div className={`error_page_wrapper ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
            <div className="error_wrap">
                <div className="container text-center">
                    <img src={sad} alt="404 sad face" />
                    <div className="error_heading text-center">
                        <h3 className="headline font-danger theme_color_6">404</h3>
                    </div>
                    <div className={`flex-[0_0_auto] w-2/3 ml-[calc(100%/6)] text-center`}
                        >
                        <p style={{ color: isDark ? '#ffffff' : '#374151' }}>
                            The page you are attempting to reach is currently not available. This may be because the
                            page does not exist or has been moved.
                        </p>
                    </div>
                    <div className="error_btn text-center">
                        <a className={`default_btn theme_bg_6 ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                            }`} href="/home">
                            Back Home
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}