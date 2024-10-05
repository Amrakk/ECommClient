import sad from "@/assets/error/sad.png";

export default function NotFound() {
    return (
        <>
            <div className="erroe_page_wrapper">
                <div className="errow_wrap">
                    <div className="container text-center">
                        <img src={sad} />
                        <div className="error_heading text-center">
                            <h3 className="headline font-danger theme_color_6">404</h3>
                        </div>
                        <div className="flex-[0_0_auto] w-2/3 ml-[calc(100%/6)] text-center">
                            <p>
                                The page you are attempting to reach is currently not available. This may be because the
                                page does not exist or has been moved.
                            </p>
                        </div>
                        <div className="error_btn text-center">
                            <a className="default_btn theme_bg_6" href="/home">
                                Back Home
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
