import { Session } from "@supabase/supabase-js";
import { FC, useEffect } from "react";
import { View } from "react-native";
import { supabase } from "../lib/supabase";

type Props = {
  session: Session;
};

const MemoList: FC<Props> = ({ session }) => {
  useEffect(() => {
    async function fetchMemos() {
      try {
        const { data, error, status } = await supabase
          .from("Memo")
          .select(`title, content`);
        console.log(data);
      } catch (e) {
        console.error(e);
      }
    }
    fetchMemos();
  }, []);

  return <View />;
};

export default MemoList;
