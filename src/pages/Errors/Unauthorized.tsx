import sad from "@/assets/error/sad.png";

export default function NotFound() {
    return (
        <>
            <div className="erroe_page_wrapper">
                <div className="errow_wrap">
                    <div className="container text-center ">
                        <img src={sad} />
                        <div className="error_heading text-center">
                            <h3 className="headline font-danger theme_color_6">404</h3>
                        </div>
                        <div className="flex-[0_0_auto] w-2/3 ml-[calc(100%/6)] text-center">
                            <p>Sorry, you are not authorized to access this page or handle this operation.</p>
                        </div>
                        <div className="error_btn text-center">
                            <a className=" default_btn theme_bg_6 " href="/home">
                                Back Home
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
