import { Session } from "@supabase/supabase-js";
import { FC, useEffect, useState } from "react";
import {
  Button,
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";
import { supabase } from "../lib/supabase";

type Props = {
  session: Session;
};

const MemoList: FC<Props> = ({ session }) => {
  const [data, setData] = useState<{ title: string; content: string }[]>([]);

  async function fetchMemos() {
    try {
      const {
        data: fetchedData,
        error,
        status,
      } = await supabase
        .from("Memo")
        .select(`title, content`)
        .order("id", { ascending: false });
      fetchedData && setData(fetchedData);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchMemos();
  }, []);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onSave = async () => {
    try {
      const { data, error, status } = await supabase
        .from("Memo")
        .insert({ title, content });

      setTitle("");
      setContent("");
      await fetchMemos();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SafeAreaView>
      <View style={{ padding: 20 }}>
        <TextInput placeholder="Title" value={title} onChangeText={setTitle} />
        <TextInput
          placeholder="Content"
          value={content}
          onChangeText={setContent}
        />
        <Button title="저장" onPress={onSave} />
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={{ padding: 20 }}>
            <View style={{ marginBottom: 10 }}>
              <Text>{item.title}</Text>
            </View>
            <View>
              <Text>{item.content}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

export default MemoList;
