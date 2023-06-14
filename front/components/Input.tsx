import { styled } from "styled-components";

export const StyledInput = styled.input`
    width: 100%;
    padding: 5px;
    margin-bottom: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
`;

type Props = {
    children?: React.ReactNode;
    type?: string;
    id?: string;
    placeholder?: string;
    name?: string;
    value?: string | number | readonly string[] | undefined;
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
    required?: true | false;
};

const Input = (props: Props) => {
    return <StyledInput {...props} />;
};

export default Input;
