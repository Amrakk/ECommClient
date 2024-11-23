import BaseModal from "@/components/Shared/BaseModal";
import { PRODUCT_CATEGORY } from "@/constants";

type Props = { isShowing: boolean; hide: () => void };

type FormValues = {
    name?: string;
    description?: string;
    category: PRODUCT_CATEGORY;
    brand?: string;
    details: { [key: string]: string };
    tags: string[];
};

export default function InsertModal(props: Props) {
    return (
        <>
            <BaseModal
                isShowing={props.isShowing}
                hide={props.hide}
                title="Create"
                top={-100}
                builder={() => {
                    return <div>test</div>;
                }}
            />
        </>
    );
}
