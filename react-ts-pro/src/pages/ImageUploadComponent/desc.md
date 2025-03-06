请帮我完成如下代码:
1. 这是一个ts的组件, 请尽量使用MUI的6.1.4可用的组件完成该功能;
2. 视图中有2个按钮: Choose Image和Upload Image;
3. 点击Upload Image会触发一个支持拖拽上传本地文件的窗口, 用户可通过拖拽本地文件进行上传, 或点击窗口中间的加号来选择本地文件, 加号下面有文字upload;
4. 组件内部有一个const [imageFiles, setImageFiles] = useState<File[]>([]), 上传成功的图片文件会追加到该state内部;
5. 不论是拖拽还是选择文件夹上传, 上传成功后3中的窗口都会显示已上传的文件列表, 每个文件最右有叉号, 点击会移除该文件;
6. 窗口右下角有2个按钮, cancel和confirm, 点击cancel将清空imageFiles, 点击confirm会将imageFiles追加到const [imageGallery, setImageGallery] = useState<File[]>([])中
请帮我实现如上功能, 并展示完整的模块代码

// ------------------

请帮我完善如下代码功能:
1. 当点击choose image按钮时, 弹出一个maxWidth = 'sm', fullWidth的dialog, dialog标题为“Choose image(s) for current Note”; 
2. dialog主体部分展示imageGallery里所有图片的缩略图, 无需显示图片的名称, 图片左上角带有一个checkbox, 若图片数量过多, 主体部分会auto出现scrollbar;
3. dialog右下角有cancel和confirm两个按钮, 点击cancel关闭窗口, 点击confirm时console.log('confirm image choosing')
4. 打开choose image时的dialog, 若图片为空, 我希望主体部分仍有一个最小高度10rem;
5. 主体部分显示的图片缩略图, 无需显示图片的名称, 每张图片占主体部分30%的宽度, 相当于每行3张缩略图, 过多时会换行;
6. 图片的Checkbox位于图片左上角, 使用MUI的Checkbox组件;
