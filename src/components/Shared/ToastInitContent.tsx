export default function ToastInitContent() {
    return (
        <div className="flex items-start gap-4 p-4">
            <div className="flex flex-col gap-4">
                <span>Address features require initial setup.</span>
                <span>
                    Please run the <strong>Address Crawl</strong> in the <strong>Advanced Panel</strong> to enable
                    functionality.
                </span>
            </div>
        </div>
    );
}
