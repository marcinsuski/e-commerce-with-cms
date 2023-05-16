import React from "react";
import * as S from "@/styles/Styles";

type Props = {
    children: React.ReactNode;
};

const Table = (props: Props) => {
    return <S.StyledTable {...props} />;
};

export default Table;
