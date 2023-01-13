<script setup>
    const myProps = defineProps(
        {
            revision: {type: Number, required: true},
            status: { type: String, required: true },
            date: { type: Date, required: true },
            name: {type: String, required: true},
            url: {type: String, required: false, default: ""},
        }
    )

    const displayDate = computed(() => {
        const today = new Date()
        if (today.toDateString() === myProps.date.toDateString())
        return myProps.date.toLocaleTimeString("en-GB", {
            hour: "numeric",
            minute: "numeric",
        })

        const diffInDays = (today - myProps.date) / (1000 * 60 * 60 * 24)
        if (diffInDays <= 7.0)
            return myProps.date.toLocaleDateString("en-GB", {
                weekday: "short",
                hour: "numeric",
                minute: "numeric",
            })

        if (diffInDays <= 365.0)
            return myProps.date.toLocaleDateString("en-GB", {
                month: "short",
                day: "numeric",
            })

        return myProps.date.toLocaleDateString("en-GB")
    })

    const statusDisplay = computed(() => {
        if (myProps.status === "published") return "Published"
        if (myProps.status === "draft") return "Draft"
        return "Draft"
    })
</script>
<template>
    <div class="flex items-center justify-between text-base text-gray-900 font-medium dark:text-white">
        <div class="flex items-center space-x-4">
            <AppRevisionLabel  :revision="myProps.revision" :status="myProps.status"></AppRevisionLabel>
            <span class="text-gray-700 dark:text-gray-200"><slot>{{ statusDisplay }}</slot></span>
        </div>
        <div class="flex items-center space-x-4">
            <span>{{ displayDate }}</span>
            <CommonAvatar :name="myProps.name" :url="myProps.url" size="sm"></CommonAvatar>
        </div>
    </div>    
</template>