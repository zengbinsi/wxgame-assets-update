class UIUtils {
    public static getButton(bgColor: number, text: string, labelColor: number = 0xffffff, width: number = 240, height: number = 100, labelSize = 40): eui.Group {
        var group = new eui.Group();
        var bg = new eui.Rect();
        bg.fillColor = bgColor;
        bg.percentWidth = bg.percentHeight = 100;
        group.addChild(bg);
        var label = new eui.Label();
        label.text = text;
        label.textAlign = egret.HorizontalAlign.CENTER;
        label.verticalAlign = egret.VerticalAlign.MIDDLE;
        label.percentWidth = label.percentHeight = 100;
        label.horizontalCenter = 0;
        label.verticalCenter = 0;
        label.size = labelSize;
        label.textColor = 0xFFFFFF;
        group.addChild(label);
        group.width = width;
        group.height = height;
        return group;
    }
    public static getTiled(horizontalGap: number = 6, verticalGap: number = 6): eui.Group {
        var group = new eui.Group();
        var layout = new eui.TileLayout();
        group.layout = layout;
        layout.horizontalGap = horizontalGap;
        layout.verticalGap = verticalGap;
        return group;
    }
}