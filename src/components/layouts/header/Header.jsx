import {
  AppBar,
  FormControl,
  Grid,
  option,
  Select,
  Toolbar,
  Typography,
  Box,
} from '@material-ui/core';
import { User } from 'components/shared/User';
import { useStore } from 'hooks/useStore';
import { observer } from 'mobx-react-lite';

export const Header = observer(() => {
  const { boards, users } = useStore();

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Box display="flex" alignItems="center">
              <Typography variant="h6">Dashboard:</Typography>
              <FormControl variant="outlined">
                <Select
                  style={{ backgroundColor: 'white', marginLeft: 10 }}
                  native
                  value={boards?.active?.id || ''}
                  onChange={(event) => {
                    const { value } = event.target;
                    boards.selectBoard(value);
                  }}
                >
                  <option value="" disabled>
                    -
                  </option>
                  {boards.list.map((board) => {
                    return (
                      <option key={board.id} value={board?.id}>
                        {board?.title}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item>
            <User user={users?.me} />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
});
