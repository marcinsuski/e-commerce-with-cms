import * as S from "@/styles/Styles";

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
    return <S.StyledInput {...props} />;
};

export default Input;
