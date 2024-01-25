/* eslint-disable no-unused-vars */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { decodeHtml } from 'src/lib/utils';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Editor as CustomEditor } from 'ckeditor5-custom-build/build/ckeditor';
import { UPLOAD_URL } from 'src/api/constants';
import { mobileWidth } from 'src/lib/constants';

const Editor = ({
  type,
  disabled,
  error,
  required,
  formVariant,
  InputProps,
  register,
  label,
  textLabel,
  dropDownOptions = [],
  minHeight = '200px',
  onChange = () => {},
  setValue,
  getValues,
  form,
  showInputField,
  gridProps,
  ...restProps
} = {}) => {
  const { setError = () => {} } = form || {};
  const { maxWidth,width='100%' } = gridProps;
  let formData = getValues(restProps?.name || 'editor') || '';
  formData = decodeHtml(formData);

  const [data, setData] = useState(formData || '');

  useEffect(() => {
    setData(formData);
  }, [formData]);

  const isMobile = useMediaQuery(mobileWidth);

  const editorRef = useRef();
  useEffect(() => {
    if (error) {
      const { editor } = editorRef.current;
      if (editor) {
        const errorPlugin = editor.plugins.get('ErrorPlugin');
        setTimeout(() => {
          errorPlugin.setErrorClass(true);
        }, 0);
      }
    }
  }, [error, editorRef]);

  useEffect(() => {
    const { editor } = editorRef.current;
    if (editor) {
      const dropDownPlugin = editor.plugins.get('DropDownPlugin');
      dropDownPlugin.updateDropDownOptions(dropDownOptions);
    }
  }, [editorRef, dropDownOptions]);

  const onReady = useCallback(
    (editor) => {
      const errorPlugin = editor.plugins.get('ErrorPlugin');
      const dropDownPlugin = editor.plugins.get('DropDownPlugin');

      editor.setData(data);

      dropDownPlugin.updateDropDownOptions(dropDownOptions);
      if (error) {
        setTimeout(() => {
          errorPlugin.setErrorClass(true);
        }, 0);
      }

      editor.editing.view.change((writer) => {
        writer.setStyle(
          'min-height',
          minHeight,
          editor.editing.view.document.getRoot()
        );
      });
    },
    [data, dropDownOptions, error, minHeight]
  );

  const editorConfig = useMemo(
    () => ({
      customDropdown: {
        options: dropDownOptions,
      },
      showInputField,
      simpleUpload: {
        // The URL that the images are uploaded to.
        uploadUrl: `${UPLOAD_URL}?editorFile=true`,
        withCredentials: true,
      },
    }),
    [dropDownOptions, showInputField]
  );

  const handleOnChange = useCallback(
    (event, editor) => {
      onChange(event, editor);
      setValue(restProps.name || 'editor', editor?.getData(), {
        shouldDirty: true,
      });
      const myError = editor?.getData().trim() === '';
      if (error && !myError) {
        setError(restProps.name, myError);
      }
    },
    [error, onChange, restProps.name, setError, setValue]
  );

  return (
    <div
      style={{
        maxWidth: isMobile ? '100vw' : '50vw',
        ...(maxWidth ? { maxWidth } : {}),
        width,
      }}
    >
      <CKEditor
        // data={data}
        ref={editorRef}
        editor={CustomEditor}
        config={editorConfig}
        onReady={onReady}
        onChange={handleOnChange}
      />
    </div>
  );
};

export default React.memo(Editor);
