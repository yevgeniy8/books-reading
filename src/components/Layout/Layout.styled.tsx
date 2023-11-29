import styled from '@emotion/styled';
import { tablet, desktop, min } from '../../helpers/media';

export const Container = styled.div`
    width: 300px;
    padding-left: 10px;
    padding-right: 10px;
    margin: 0 auto;

    ${min(tablet)} {
        width: 736px;
        padding-left: 12px;
        padding-right: 12px;
    }

    ${min(desktop)} {
        width: 1280px;
    }
`;
