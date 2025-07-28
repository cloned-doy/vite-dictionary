export interface WordData {
  id?: string | null;
  traditional: string;
  simplified: string;
  pinyin: string;
  english: string;
  indonesian: string;
  part_of_speech?: string | null;
  notes?: string | null;
}
