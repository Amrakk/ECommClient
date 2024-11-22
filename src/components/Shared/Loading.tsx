import "@/styles/loader.css";
import { useLoadingStore } from "@/stores/loading.store";

export default function Loading(props: { manual?: boolean }) {
    const isLoading = useLoadingStore((state) => state.isLoading);

    return isLoading || props.manual ? (
        <div className="fixed inset-0 bg-gray-300 bg-opacity-20 z-50 flex items-center justify-center">
            <div className="loader" />
        </div>
    ) : null;
}
