import React from "react";
import { useAuth, useResizeScreen } from "../../hooks";
import { Navigation } from "../../components/Navigation";
import { UserMenu } from "../../components/UserMenu";
import * as S from "./AppBar.styled";
import { UserLabel } from "../../components/UserLabel";

export const AppBar: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const { isMobile } = useResizeScreen();

  return (
    <S.Header>
      <S.Container>
        <S.Logo>BR</S.Logo>

        {isLoggedIn && (
          <>
            {!isMobile && <UserLabel />}

            <S.NavBox>
              <Navigation />

              <UserMenu />
            </S.NavBox>
          </>
        )}
      </S.Container>
    </S.Header>
  );
};
