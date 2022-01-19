export const MessageSendInput = (props: {
    inputType: string;
    name: string;
    placeholder: string;
}) => {
    return (
        <input
            type={props.inputType}
            className='form-control'
            name={props.name}
            placeholder={props.placeholder}
        />
    );
};
