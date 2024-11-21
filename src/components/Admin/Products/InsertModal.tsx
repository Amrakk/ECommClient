import BaseModal from "@/components/Shared/BaseModal";

type Props = { isShowing: boolean; hide: () => void };

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
